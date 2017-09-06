#!/usr/bin/gjs

const GLib = imports.gi.GLib
const Gtk = imports.gi.Gtk
const Lang = imports.lang
const Gdk = imports.gi.Gdk

const App = new Lang.Class({
    Name: 'Calculadora',

    //Cria a aplicação
    _init: function() {
        this.application = new Gtk.Application()

        this.application.connect('activate', Lang.bind(this, this._onActivate))
        this.application.connect('startup', Lang.bind(this, this._onStartup))
    },

    _onActivate: function() {
        this._window.present()
    },

    _onStartup: function() {
        this._buildUi()
    },

    _buildUi: function() {
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            title: 'Calculadora',
            default_width: 185,
            default_height: 140,
            resizable: false,
            window_position: Gtk.WindowPosition.CENTER
        })

        this._headerBar = new Gtk.HeaderBar()
        this._headerBar.set_title('Calculadora')
        this._headerBar.set_subtitle('Calculadora com GJs')
        this._headerBar.show_close_button = true

        this._grid = new Gtk.Grid({margin: 10})

        this._text = new Gtk.Entry({margin_bottom: 7})
        this._text.set_alignment(1)

        const arraybuttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'C', '/', '*', '-', '.', '+']

        this._buttons = arraybuttons.map(elem => new Gtk.Button({label: `${elem}`, margin: 3}))
        this._buttons.map(elem => {
          if(elem.get_label() === 'C') {
            let red_color = new Gdk.RGBA({red: 0.933, green: 0.133, blue: 0.133, alpha: 1})
            elem.override_color(Gtk.StateFlags.NORMAL, new Gdk.RGBA({red: 1, green: 1, blue: 1, alpha: 1}))
            elem.override_background_color(Gtk.StateFlags.NORMAL, red_color)
            elem.connect('clicked', Lang.bind(this, this._clear))
          } else {
            elem.connect('clicked', Lang.bind(this, this._setText))
          }
        })

        this._grid.attach(this._text, 0, 0, 4, 1)
        this._grid.attach(this._buttons[6], 0, 1, 1, 1)
        this._grid.attach(this._buttons[7], 1, 1, 1, 1)
        this._grid.attach(this._buttons[8], 2, 1, 1, 1)
        this._grid.attach(this._buttons[10], 3, 1, 1, 1)
        this._grid.attach(this._buttons[3], 0, 2, 1, 1)
        this._grid.attach(this._buttons[4], 1, 2, 1, 1)
        this._grid.attach(this._buttons[5], 2, 2, 1, 1)
        this._grid.attach(this._buttons[11], 3, 2, 1, 1)
        this._grid.attach(this._buttons[0], 0, 3, 1, 1)
        this._grid.attach(this._buttons[1], 1, 3, 1, 1)
        this._grid.attach(this._buttons[2], 2, 3, 1, 1)
        this._grid.attach(this._buttons[12], 3, 3, 1, 1)
        this._grid.attach(this._buttons[9], 0, 4, 1, 1)
        this._grid.attach(this._buttons[13], 3, 4, 1, 1)
        this._grid.attach(this._buttons[15], 2, 4, 1, 1)
        this._grid.attach(this._buttons[14], 1, 4, 1, 1)

        this._btnResolve = new Gtk.Button({label: '=', margin_top: 7})
        this._btnResolve.connect('clicked', Lang.bind(this, this._setResolve))

        let blue_color = new Gdk.RGBA({red: 0.301, green: 0.678, blue: 0.831, alpha: 1})
        this._btnResolve.override_background_color(Gtk.StateFlags.NORMAL, blue_color)
        this._btnResolve.override_color(Gtk.StateFlags.NORMAL, new Gdk.RGBA({red: 1, green: 1, blue: 1, alpha: 1}))

        this._grid.attach(this._btnResolve, 0, 5, 5, 1)

        this._window.set_titlebar(this._headerBar)
        this._window.add(this._grid)

        this._window.show_all()
    },

    _setText: function(btn) {
        if(this._resolved && !isNaN(btn.get_label())) {
          this._text.set_text('')
        }
        this._resolved = false
        const textlabel = this._text.get_text() + btn.get_label()
        this._text.set_text(`${textlabel}`)
    },

    _setResolve: function() {
        const textlabel = eval(this._text.get_text())
        this._text.set_text(`${textlabel}`)
        this._resolved = true
    },

    _clear: function() {
      this._text.set_text('')
    },

    _resolved: false
})

let app = new App()
app.application.run(ARGV)
