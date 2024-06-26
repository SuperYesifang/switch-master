function getBsFromOsByAs(Os, KA, As, KB) {
	if ((As instanceof Array) && (Os instanceof Array)) {
		let Bs = [],
			records = {},
			recordsLength = 0;
		for (let A of As) {
			let B;
			if (records[A]) B = KB === void 0 ? records[A] : records[A][KB];
			else {
				for (let O of Os) {
					if (recordsLength >= Os.length) break;
					if (O[KA] == A) B = KB === void 0 ? O : O[KB];
					records[O[KA]] = O;
					recordsLength++;
				}
			}
			Bs.push(B);
		}
		return Bs;
	}
}

function getBFromOByA(O, KA, A, KB) {
	if (A instanceof Array) {
		let records = {}, once = 1;
		return A.map(_A => {
			let B = [];
			if (records[_A]) B = records[_A];
			else if (once) {
				for (let k in O) {
					if (O[k][KA] == _A) B.push(KB ? O[k][KB] : O[k]);
					if (records[O[k][KA]]) records[O[k][KA]].push(KB ? O[k][KB] : O[k]);
					else records[O[k][KA]] = [KB ? O[k][KB] : O[k]];
				}
				once = 0;
			}
			return B.length <= 1 ? B[0] : B;
		})
	}
	let B = [];
	for (let k in O) {
		if (O[k][KA] == A) {
			B.push(KB ? O[k][KB] : O[k]);
		}
	}
	return B.length <= 1 ? B[0] : B;
}

function createCallAFromO(A, getArgs=() => []) {
	return function(O) {
		if (O instanceof Array) O.forEach(o => o && o[A] && o[A](...getArgs(O)));
		else O && O[A] && O[A](...getArgs(O));
	}
}

function createRandomId(name = "", ids = []) {
	let rnadomId = Math.random().toString(16).slice(-12);
	let id = `${name ? (name + "__") : ""}${rnadomId}`;
	let index = ids.indexOf(id);
	if (index != -1) id = createRandomId.createId(ids);
	return id;
}

export class Switch {
	listeners = new Set();
	constructor(config) {
		this.id = config.id || createRandomId("Switch");
		this.name = config.name || config.id;
		this.status = !!config.status;
	}

	onChange(listener, lazy=false) {
		let params = { listener, lazy };
		this.listeners.add(params);
		return () => this.listeners.delete(params);
	}

	toggle(status) {
		let preStatus = this.status;
		let curStatus = this.status = status === void 0 ? !this.status : status;
		[...this.listeners].forEach(({ listener, lazy }) => (!(lazy && (preStatus === curStatus))) && listener(this.status));
	}

	close() {
		this.toggle(false);
	}

	open() {
		this.toggle(true);
	}

}

class SwitchMaster {
	switchs = {};
	initialStatus = {};
	constructor(configs) {
		if (configs instanceof Array) {
			configs.forEach(config => {
				if (config.id) {
					if (this.switchs[config.id]) throw Error(`\`${config.id}\` repeated with the id of another Swtich.`);
				}
				let s = new Switch(config);
				if (this.switchs[s.id]) s.id = createRandomId("Switch", Object.keys(this.switchs));
				this.switchs[s.id] = s;
				this.initialStatus[s.id] = s.status;
			})
		}
	}

	addSwitch(s) {
		if (s instanceof Switch) {
			if (this.switchs[s.id]) {
				throw Error(`\`${s.id}\` repeated with the id of another Swtich.`);
			}
			this.switchs[s.id] = s;
			this.initialStatus[s.id] = s.status;
		}
	}

	removeSwitch(s) {
		if (!(s instanceof Array)) s = [s];
		s.forEach(_s => {
			if (_s instanceof Switch) {
				delete this.switchs[_s.id];
				delete this.initialStatus[s.id];
			}
		});
	}

	removeSwitchById(id) {
		if (!(id instanceof Array)) id = [id];
		id.forEach(_id => {
			delete this.switchs[_id];
			delete this.initialStatus[s.id];
		});
	}

	removeSwitchByName(name) {
		if (!(name instanceof Array)) names = [name];
		name.forEach(_name => {
			for (let k in this.switchs) {
				if (this.switchs[k].name == _name) {
					delete this.switchs[k];
					delete this.initialStatus[k];
				}
			}
		})
	}

	getSwitchById(id) {
		if (id instanceof Array) {
			return id.map(_id => this.switchs[_id]);
		}
		return this.switchs[id];
	}

	getSwitchByName(name) {
		return getBFromOByA(this.switchs, "name", name);
	}

	getNameById(id) {
		if (id instanceof Array) {
			return id.map(_id => this.switchs[_id]?.name);
		}
		return this.switchs[id]?.name;
	}

	getIdByName(name) {
		return getBFromOByA(this.switchs, "name", name, "id");
	}

	closeById(id) {
		if (!(id instanceof Array)) id = [id];
		this.getSwitchById(id).forEach(s => s && s.close && s.close());
	}

	closeByName(name) {
		if (!(name instanceof Array)) name = [name];
		this.getSwitchByName(name).forEach(createCallAFromO("close"));
	}

	openById(id) {
		if (!(id instanceof Array)) id = [id];
		this.getSwitchById(id).forEach(s => s && s.open && s.open());
	}

	openByName(name) {
		if (!(name instanceof Array)) name = [name];
		this.getSwitchByName(name).forEach(createCallAFromO("open"));
	}

	toggleById(config) {
		if (config instanceof Array) {
			config.forEach(id => {
				if (id instanceof Object) this.toggleById(id);
				else this.switchs[id]?.toggle();
			});
		} else if (config instanceof Object) {
			this.getSwitchById(Object.keys(config)).forEach(s => s && s.toggle && s.toggle(config[s.id]));
		} else {
			this.switchs[config]?.toggle();
		}
	}

	toggleByName(config) {
		if (config instanceof Array) {
			config.forEach(id => {
				if (id instanceof Object) this.toggleByName(id);
				else this.getSwitchByName(id)?.toggle();
			});
		} else if (config instanceof Object) {
			this.getSwitchByName(Object.keys(config)).forEach(createCallAFromO("toggle", s => [config[s.name]]));
		} else {
			this.getSwitchByName(config)?.toggle();
		}
	}

	reset(id) {
		let ids;
		if (id) {
			if (!(id instanceof Array)) ids = [id];
			else ids = id;
		} else {
			ids = Object.keys(this.initialStatus);
		}
		ids.forEach(_id => this.switchs[_id] &&this.switchs[_id].toggle(this.initialStatus[_id]));
	}
}

export default SwitchMaster;