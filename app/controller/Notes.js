Ext.define('NotesApp.controller.Notes', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            notesListView: 'noteslistview',
            noteEditorView: 'noteeditorview',
            notesList: '#notesList'
        },
        control: {
            notesListView: {
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand'
            },
            noteEditorView: {
                saveNoteCommand: 'onSaveNoteCommand',
                deleteNoteCommand: 'onDeleteNoteCommand',
                backToHomeCommand: 'onBackToHomeCommand'
            }
        }
    },
    onNewNoteCommand: function() {
        console.log('controller.Notes:onNewNoteCommand');
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        var newNote = Ext.create('NotesApp.model.Note', {
            id: noteId,
            dateCreated: now,
            title: '',
            narrative: ''
        });
        this.activateNoteEditor(newNote);
    },
    onEditNoteCommand: function(list, record) {
        console.log('controller.Notes:onEditNoteCommand');
        this.activateNoteEditor(record);
    },
    onSaveNoteCommand: function() {
        console.log('controller.Notes:onSaveNoteCommand');
        var noteEditor = this.getNoteEditorView();
        var currentNote = noteEditor.getRecord();
        var newValues = noteEditor.getValues();
        currentNote.set('title', newValues.title);
        currentNote.set('narrative', newValues.narrative);
        var errors = currentNote.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField('title')[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }
        var notesStore = Ext.getStore('Notes');

        if (null == notesStore.findRecord('id', currentNote.data.id)) {
            notesStore.add(currentNote);
        }
        notesStore.sync();
        notesStore.sort([{property: 'dateCreated', direction: 'DESC'}]);
        this.activateNotesList();
    },
    onDeleteNoteCommand:function() {
        console.log('controller.Notes:onDeleteNoteCommand');
        var noteEditor = this.getNoteEditorView();
        var currentNote = noteEditor.getRecord();
        var notesStore = Ext.getStore('Notes');

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },
    onBackToHomeCommand: function() {
        console.log('controller.Notes:onBackToHomeCommand');
        this.activateNotesList();
    },
    launch: function() {
        this.callParent(arguments);
        Ext.getStore('Notes').load();
        console.log('notes launch');
    },
    init: function() {
        this.callParent(arguments);
        console.log('notes init');
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function(record) {
        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record);
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function() {
        Ext.Viewport.animateActiveItem(this.getNotesListView(), this.slideRightTransition);
    },
    slideLeftTransition: { type: 'slide', direction: 'left'},
    slideRightTransition: { type: 'slide', direction: 'right'}
});