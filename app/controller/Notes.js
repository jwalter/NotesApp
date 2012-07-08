Ext.define('NotesApp.controller.Notes', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            notestListContainer: 'notesListContainer'
        },
        control: {
            notesListContainer: {
                newNoteCommand: 'onNewNoteCommand',
                editNoteCommand: 'onEditNoteCommand'
            }
        }
    },
    onNewNoteCommand: function() {
        console.log('onNewNoteCommand');
    },
    onEditNoteCommand: function() {
        console.log('onEditNoteCommand');
    },
    launch: function() {
        this.callParent(arguments);
        Ext.getStore('Notes').load();
        console.log('notes launch');
    },
    init: function() {
        this.callParent(arguments);
        console.log('notes init');
    }
});