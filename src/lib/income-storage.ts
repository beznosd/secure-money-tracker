const DATABASE_NAME = 'secure-money-tracker';
const DATABASE_VERSION = 1;
const INCOME_STORE_NAME = 'incomes';

export type IncomeRecord = {
	id: string;
	amount: number;
	category: string;
	createdAt: string;
};

let databasePromise: Promise<IDBDatabase> | undefined;

function openDatabase() {
	if (!('indexedDB' in globalThis)) {
		return Promise.reject(new Error('IndexedDB is not available in this browser.'));
	}

	databasePromise ??= new Promise<IDBDatabase>((resolve, reject) => {
		const openDBrequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

		openDBrequest.onupgradeneeded = () => {
			const database = openDBrequest.result;

			if (!database.objectStoreNames.contains(INCOME_STORE_NAME)) {
				const incomeStore = database.createObjectStore(INCOME_STORE_NAME, { keyPath: 'id' });
				incomeStore.createIndex('createdAt', 'createdAt');
			}
		};

		openDBrequest.onsuccess = () => {
			const database = openDBrequest.result;

			database.onversionchange = () => {
				database.close();
				databasePromise = undefined;
			};

			resolve(database);
		};

		openDBrequest.onerror = () =>
			reject(openDBrequest.error ?? new Error('Could not open income storage.'));
		openDBrequest.onblocked = () => reject(new Error('Income storage is blocked by another tab.'));
	}).catch((error: unknown) => {
		databasePromise = undefined;
		throw error;
	});

	return databasePromise;
}

export async function getIncomeRecords() {
	const database = await openDatabase();

	return new Promise<IncomeRecord[]>((resolve, reject) => {
		const transaction = database.transaction(INCOME_STORE_NAME, 'readonly');
		const request = transaction.objectStore(INCOME_STORE_NAME).getAll();

		let records: IncomeRecord[] = [];
		request.onsuccess = () => {
			records = request.result as IncomeRecord[];
		};
		transaction.oncomplete = () => {
			resolve(records.sort((left, right) => right.createdAt.localeCompare(left.createdAt)));
		};

		transaction.onerror = () =>
			reject(transaction.error ?? new Error('Could not load saved income.'));
		transaction.onabort = () =>
			reject(transaction.error ?? new Error('Loading saved income was interrupted.'));
	});
}

export async function saveIncomeRecord(record: IncomeRecord) {
	const database = await openDatabase();

	return new Promise<void>((resolve, reject) => {
		const transaction = database.transaction(INCOME_STORE_NAME, 'readwrite');

		transaction.objectStore(INCOME_STORE_NAME).add(record);
		transaction.oncomplete = () => resolve();

		transaction.onerror = () =>
			reject(transaction.error ?? new Error('Could not save the income entry.'));
		transaction.onabort = () =>
			reject(transaction.error ?? new Error('Saving the income entry was interrupted.'));
	});
}
