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

function removeAsFromOs(Os, KA, As) {
	if ((Os instanceof Array) && (As instanceof Array)) {
		As.forEach(A => {
			for(let i = 0; i < Os.length; i++) {
				if (Os[i][KA] == A) {
					Os.splice(i, 1);
					break;
				}
			}
		})
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

	onChange(listener) {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	toggle(status) {
		this.status = status === void 0 ? !this.status : status;
		[...this.listeners].forEach(cb => cb(this.status));
	}

	close() {
		this.toggle(false);
	}

	open() {
		this.toggle(true);
	}

}

class SwitchMaster {
	switchs = [];
	constructor(configs) {
		if (configs instanceof Array) {
			let ids = {}, names = {};
			configs.forEach(config => {
				if (config.id) {
					if (ids[config.id]) throw Error(`\`${config.id}\` repeated with the id of another Swtich.`);
				}
				if (config.name) {
					if (names[config.name]) throw Error(`\`${config.name}\` repeated with the name of another Swtich.`);
				}
				let s = new Switch(config);
				if (ids[s.id]) s.id = createRandomId("Switch", Object.keys(ids));
				if (!names[s.name]) {
					ids[s.id] = 1;
					names[s.name] = 1;
					this.switchs.push(s);
				} else throw Error("Switch name must be a unique string!");
			})
		}
	}

	addSwitch(s) {
		if (s instanceof Switch) {
			if (!this.switchs.some(_s => {
				let uniqueId = _s.id == s.id;
				let uniqueName = _s.name == s.name;
				if (uniqueId) throw Error(`\`${s.id}\` repeated with the id of another Swtich.`);
				if (uniqueName) throw Error(`\`${s.name}\` repeated with the name of another Swtich.`);
				return uniqueId || uniqueName;
			})) {
				this.switchs.push(s);
			}
		}
	}

	removeSwitch(s) {
		if (s instanceof Switch) {
			let index = this.switchs.indexOf(s);
			if (index != -1) this.switchs.splice(index, 1);
		}
	}

	removeSwitchById(id) {
		let ids = id;
		if (!(id instanceof Array)) ids = [id];
		removeAsFromOs(this.switchs, "id", ids);
	}

	removeSwitchByName(name) {
		let names = name;
		if (!(name instanceof Array)) names = [name];
		removeAsFromOs(this.switchs, "name", names);
	}

	getSwitchById(id) {
		return this.switchs.find(s => s == id);
	}

	getSwitchsByIds(ids) {
		return getBsFromOsByAs(this.switchs, "id", ids);
	}

	getSwitchByName(name) {
		return this.switchs.find(s => s.name == name);
	}

	getSwitchsByNames(names) {
		return getBsFromOsByAs(this.switchs, "name", names);
	}

	getNamesByIds(ids) {
		return getBsFromOsByAs(this.switchs, "id", ids, "name");
	}

	getIdsByNames(names) {
		return getBsFromOsByAs(this.switchs, "name", names, "id");
	}

	closeById(id) {
		let s = this.switchs.find(s => s.id == id);
		s && s.close();
	}

	closeById(id) {
		let ids = id;
		if (!(id instanceof Array)) ids = [id];
		this.getSwitchsByIds(ids).switchs.forEach(s => s && s.close());
	}

	closeByName(name) {
		let names = name;
		if (!name instanceof Array) names = [name];
		this.getSwitchsByNames(names).forEach(s => s && s.close());
	}

	openById(id) {
		let ids = id;
		if (!(id instanceof Array)) ids = [id];
		this.getSwitchsByIds(ids).forEach(s => s && s.open());
	}

	openByName(name) {
		let names = name;
		if (!(name instanceof Array)) names = [name];
		console.log(names, !(name instanceof Array))
		console.log(this.getSwitchsByNames(names), names)
		this.getSwitchsByNames(names).forEach(s => s && s.open());
	}

	toggleById(config) {
		if (config instanceof Object) {
			this.getSwitchsByIds(Object.keys(config)).forEach(s => s && s.toggle(config[s]));
		}
	}

	toggleByName(config) {
		if (config instanceof Object) {
			this.getSwitchsByNames(Object.keys(config)).forEach(s => s && s.toggle(config[s]));
		}
	}
}

export default SwitchMaster;