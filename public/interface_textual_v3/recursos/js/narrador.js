var narrador = {
    "carregar": function () {
        meSpeak.loadConfig("recursos/mespeak/mespeak_config.json");
        meSpeak.loadVoice("recursos/mespeak/pt.json");
    },
    "fila": [],
    "falar": function () {
        var texto = this.fila.shift();
        while (this.fila.length > 0)
            texto += "\n" + this.fila.shift();
        saida("narrador", texto);
        meSpeak.speak(texto, {
            speed: '135',
            wordgap: '3',
            variant: 'm1',
            pitch: '30'
        });
    },
    "parar": function () {
        meSpeak.stop();
    }
}