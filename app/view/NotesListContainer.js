Ext.define('NotesApp.view.NotesListContainer', {
    extend: 'Ext.Container',
    alias: 'widget.noteslistcontainer',

    initialize: function() {
        this.callParent(arguments);

        var newButton = {
            xtype: 'button',
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap,
            scope: this
        }
        var topToolbar = {
            xtype: 'toolbar',
            title: 'My Notes',
            docked: 'top',
            items: [
                {xtype: 'spacer'},
                newButton
            ]
        }
        var notesList = {
            xtype: "noteslist",
            listeners: {
                disclose: { fn: this.onNotesListDisclose, scope: this }
            }
        };

        this.add([topToolbar, notesList]);
    },
    onNewButtonTap: function() {
        console.log('newNoteCommand');
        this.fireEvent('newNoteCommand', this);
    },
    config: {
        layout: {
            type: 'fit'
        }
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});