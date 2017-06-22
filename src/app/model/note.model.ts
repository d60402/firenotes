export class Note {

	$key: string;
	content: string;
	title: string;
	createDate: string;
	updateDate: string;

	private 
	constructor(content: string, title?: string) {
		this.content = content;
		this.title = title;
		this.createDate = new Date().toJSON();
		this.updateDate = this.createDate;
	}

	touch() {
		this.updateDate = new Date().toJSON();
	}
}