#!/usr/bin/gjs

const Glib = imports.gi.GLib
const Gtk = imports.gi.Gtk
const Lang = imports.lang
const Webkit = imports.gi.WebKit2

const App = new Lang.Class({
    Name: 'New App',

    //Cria a aplicação
    _init: function() {
        this.application = new Gtk.Application ();

        //Conecta 'activate' e 'startup' sinais para as funções callback
        this.application.connect('activate', Lang.bind(this, this._onActivate));
        this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    //Função callback para o sinal 'activate' presente na janela quando ativa
    _onActivate: function() {
        this._window.present()
    },

    //Função callback para o sinal 'startup' construir a interface do usuario
    _onStartup: function() {
        this._buildUi()
    },

    //Função para construir a interface do usuario
    _buildUi: function() {

        //Cria a janela da aplicação
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            title: 'App for Linux',
            default_height: 600,
            default_width: 800,
            window_position: Gtk.WindowPosition.CENTER
        })

        //Cria um web view para exibir um web app
        this._webView = new Webkit.WebView()

        //Envia o web app para o webview
        this._webView.load_uri('http://google.com', null)

        this._headerBar = new Gtk.HeaderBar()
        this._headerBar.set_title('App for Linux')
        this._headerBar.set_subtitle('WebKit Teste')
        this._headerBar.show_close_button = true

        this._window.set_titlebar(this._headerBar)

        //Insere o webview na janela do applicativo
        this._window.add(this._webView)

        //Exibe a janela e todos seus widgets filhos
        this._window.show_all()
    }

})

let app = new App()
app.application.run(ARGV)
