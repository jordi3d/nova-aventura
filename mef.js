//
// Màquina d'Estats Finits amb JavaScript per controlar els esdeveniments
//

function Automat(ajustos) {
    this._actual = ajustos.estatInicial
    this.accions = ajustos.accions
    this.estats = ajustos.estats
}

let prototip = Automat.prototype

prototip.emit = function(esdeveniment) {
    let estat = this.estats[this._actual]
    let transicio = estat[esdeveniment]
    if (!transicio) {
        throw new Error(`Esdeveniment(${esdeveniment}) de l'actual` +
            ` estat(${this._actual}) no existeix.`)
    }
    let vellEstat = this._actual
    let nouEstat = transicio.a
    this._actual = nouEstat
    transicio.accions.forEach((fnName) => {
        this.accions[fnName].call(this, vellEstat, nouEstat)
    })
}

prototip.getState = function() {
    return this._actual
}

let estatSemafor = new Automat({
    estatInicial: "inicial", // Estat Inicial

    // Tots els estats possibles. Descriu els esdevemniments per passar de l'estat actual al següent
    // i les accions que s'han de fer a partir d'aquest punt.

    estats: {
        inicial: { // des de l'estat
            engega: { // esdeveniment
                a: "funciona", // a l'estat
                accions: ["comptaFunciona"] // accions a fer
            },
        },

        funciona: {
            timeout: {
                a: "nohotoquis",
                accions: ["comptaNHT"]
            }
        },

        nohotoquis: {
            timeout: {
                a: "hohastocat",
                accions: ["comptaHHT"]
            }
        },

        hohastocat: {
            timeout: {
                a: "lhascagat",
                accions: ["comptaLHC"]
            }
        },

        lhascagat: {
            timeout: {
                a: "capproblema",
                accions: ["comptaNP"]
            }
        },

        capproblema: {
            timeout: {
                a: "hosapalgu",
                accions: ["comptaHSA"]
            }
        },

        hosapalgu: {
            timeout: {
                a: "ensdonaraproblemes",
                accions: ["comptaEDP"]
            }
        },

        ensdonaraproblemes: {
            timeout: {
                a: "amagaho",
                accions: ["comptaAH"]
            }
        },

        amagaho: {
            timeout: {
                a: "burro",
                accions: ["comptaB"]
            }
        },

        burro: {
            timeout: {
                a: "potsdonarlaculpa",
                accions: ["comptaPDLCAA"]
            }
        },

        potsdonarlaculpa: {
            timeout: {
                a: "llensaho",
                accions: ["comptaLH"]
            }
        },

        llensaho: {
            timeout: {
                a: "final",
                accions: ["comptaFinal"]
            }
        },

        final: {
            timeout: {
                a: "final",
                accions: [""]
            }
        }

    },

    accions: {
        comptaFunciona: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Funciona?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("funciona")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaNHT: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">No ho toquis!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("No ho toquis")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaHHT: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho has tocat?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ho has tocat?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaLHC: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = `<p id="missatge_estat">L'has cagat!</p>`
            let text2 = document.getElementById('caminet')
            caminet.push("L'has cagat")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaNP: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Cap problema!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Cap Problema")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaHSA: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho sap alg&uacute;?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ho sap alg&uacute;?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaEDP: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ens donar&agrave; problemes?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ens donar&agrave; problemes?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaAH: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Amaga-ho!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Amaga-ho")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaB: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Burro!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Burro!")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaPDLCAA: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Pots donar la culpa a alg&uacute;?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Pots donar la culpa a alg&uacute;?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaLH: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Llen&ccedil;a-ho!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Llen&ccedil;a-ho!")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
        },
        comptaFinal: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">FINS A LA PROPERA!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("FINAL!")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
            throw new Error()
                //return process.exit(1)
        }
    }
})
let caminet = [];
estatSemafor.emit("engega")