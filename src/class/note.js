class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  // Common methods for all note types
  print() {
    console.log(`${this.title}\n${this.content}`);
  }
}

class PersonalNote extends Note {
  constructor(title, content) {
    super(title, content);
    this.type = "personal";
  }

  getNote() {
    return { title: this.title, content: this.content, type: this.type };
  }
}

class WorkNote extends Note {
  constructor(title, content) {
    super(title, content);
    this.type = "work";
  }

  getNote() {
    return { title: this.title, content: this.content, type: this.type };
  }
}

class NoteFactory {
  createPersonalNote(title, content) {
    return new PersonalNote(title, content);
  }

  createWorkNote(title, content) {
    return new WorkNote(title, content);
  }
}

module.exports = NoteFactory;