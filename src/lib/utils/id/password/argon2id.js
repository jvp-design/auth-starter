import { hash, verify } from '@node-rs/argon2';

export class Argon2id {
	constructor(options) {
		this.memory_size = options?.memory_size ?? 19456;
		this.iterations = options?.iterations ?? 2;
		this.tag_length = options?.tag_length ?? 32;
		this.parallelism = options?.parallelism ?? 1;
		this.secret = options?.secret ?? null;
	}

	async hash(password) {
		return await hash(password.normalize('NFKC'), {
			memoryCost: this.memory_size,
			timeCost: this.iterations,
			outputLen: this.tag_length,
			parallelism: this.parallelism,
			version: 1,
			secret: this.secret ? Buffer.from(this.secret) : undefined
		});
	}

	async verify(hash, password) {
		return await verify(hash, password.normalize('NFKC'), {
			memoryCost: this.memory_size,
			timeCost: this.iterations,
			outputLen: this.tag_length,
			parallelism: this.parallelism,
			version: 1,
			secret: this.secret ? Buffer.from(this.secret) : undefined
		});
	}
}
