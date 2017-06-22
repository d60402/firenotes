import { Note } from './note.model';

describe('Note', () => {
	it('should have a fully-baked Note when newed', () => {
		const title = 'My test note';
		const content = 'Lorem ipsum dolor sit amet...';
		const myNote = new Note(content, title);

		expect(myNote.content).toBe(content);
		expect(myNote.title).toBe(title);
		// expect(myNote.id).not.toBeNull();
		expect(myNote.createDate).not.toBeNull;
		expect(myNote.updateDate).not.toBeNull;
	});
});