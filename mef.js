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

let estatAutomat = new Automat({
    estatInicial: "inicial", // Estat Inicial
    estatFinal: "final", // Estat Final

    // Tots els estats possibles. Descriu els esdevemniments per passar de l'estat actual al següent
    // i les accions que s'han de fer a partir d'aquest punt.

    estats: {
        inicial: { // des de l'estat
            engega: { // esdeveniment
                a: "funciona", // a l'estat
                accions: ["comptaFunciona"] // accions a fer
            }
        },

        /*funciona: {
            timeout: {
                a: "nohotoquis",
                accions: ["comptaNHT"]
            }
        },*/
        funciona: {
            funcionaSi: {
                a: "nohotoquis",
                accions: ["comptaNHT"]
            },
            funcionaNo: {
                a: "hohastocat",
                accions: ["comptaHHT"]
            }
        },

        /*
        funcionaSi
            NHT
        funcionaNo
            HHT
        nohotoquis ++
            CP
        capproblema ++
            Final
        hohastocatSi
            Burro
        Burro        ++
            HSA
        alguhosapSi
            LHC
        alguhosapNo
            AH        
        potsculparSi
            CP
        potsculparNo
            LHC
        amagaho      ++
            CP
        hohastocatNo
            EDP
        ensdonaraproblemesSi
            LHC
        ensdonaraproblemesNo
            LH
        llencaho    ++
            CP
        */

        /*nohotoquis: {
            timeout: {
                a: "hohastocat",
                accions: ["comptaHHT"]
            }
        },*/
        nohotoquis: {
            timeout: {
                a: "capproblema",
                accions: ["comptaNP"]
            }
        },
        /*hohastocat: {
            timeout: {
                a: "lhascagat",
                accions: ["comptaLHC"]
            }
        },*/
        hohastocat: {
            hohastocatSi: {
                a: "burro",
                accions: ["comptaB"]
            },
            hohastocatNo: {
                a: "ensdonaraproblemes",
                accions: ["comptaEDP"]
            }
        },

        lhascagat: {
            timeout: {
                a: "capproblema",
                accions: ["comptaNP"]
            }
        },

        /*capproblema: {
            timeout: {
                a: "hosapalgu",
                accions: ["comptaHSA"]
            }
        },*/
        capproblema: {
            timeout: {
                a: "final",
                accions: ["comptaFinal"]
            }
        },

        /*hosapalgu: {
            timeout: {
                a: "ensdonaraproblemes",
                accions: ["comptaEDP"]
            }
        },*/
        hosapalgu: {
            hosapalguSi: {
                a: "ensdonaraproblemes",
                accions: ["comptaEDP"]
            },
            hosapalguNo: {
                a: "ensdonaraproblemes",
                accions: ["comptaEDP"]
            },
        },

        ensdonaraproblemes: {
            timeout: {
                a: "amagaho",
                accions: ["comptaAH"]
            }
        },

        /*amagaho: {
            timeout: {
                a: "burro",
                accions: ["comptaB"]
            }
        },*/
        amagaho: {
            timeout: {
                a: "capproblema",
                accions: ["comptaNP"]
            }
        },

        /*burro: {
            timeout: {
                a: "potsdonarlaculpa",
                accions: ["comptaPDLCAA"]
            }
        },*/
        burro: {
            timeout: {
                a: "hosapalgu",
                accions: ["comptaHSA"]
            }
        },

        potsdonarlaculpa: {
            timeout: {
                a: "llensaho",
                accions: ["comptaLH"]
            }
        },

        /*llensaho: {
            timeout: {
                a: "final",
                accions: ["comptaFinal"]
            }
        },*/
        llensaho: {
            timeout: {
                a: "capproblema",
                accions: ["comptaNP"]
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
            if (typeof(resposta) === "undefined") {
                let resposta = check_sn("Funciona? ")
                if (resposta === 's')
                    this.emit("funcionaSi");
                else
                    this.emit("funcionaNo");
                console.log(`Funciona? ${resposta}`)
            }
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Funciona?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Funciona?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
                /*setTimeout(() => {
                    this.emit("timeout")
                }, 50)*/
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
            console.log(`No ho toquis!`)
        },
        comptaHHT: function() {
            let resposta = check_sn("Ho has tocat? ")
            if (resposta === 's')
                this.emit("hohastocatSi");
            else
                this.emit("hohastocatNo");
            console.log(`Ho has tocat? ${resposta}`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho has tocat?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ho has tocat?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
                /*setTimeout(() => {
                    this.emit("timeout")
                }, 50)*/
            console.log(`Ho has tocat? ${resposta}`)
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
            console.log(`L'has cagat!`)
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
            console.log(`Cap problema!`)
        },
        comptaHSA: function() {
            let resposta = check_sn("Ho sap algú? ")
            if (resposta === 's')
            ;
            else
            ;
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho sap alg&uacute;?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ho sap alg&uacute;?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 50)
            console.log(`Ho sap algú? ${resposta}`)
        },
        comptaEDP: function() {
            let resposta = check_sn("Ens donarà problemes? ")
            if (resposta === 's')
            ;
            else
            ;
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ens donar&agrave; problemes?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Ens donar&agrave; problemes?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 50)
            console.log(`Ens donarà problemes? ${resposta}`)
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
            console.log(`Amaga-ho!`)
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
            console.log(`Burro!`)
        },
        comptaPDLCAA: function() {
            let resposta = check_sn("Pots donar la culpa a algú altre? ")
            if (resposta === 's')
            ;
            else
            ;
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Pots donar la culpa a alg&uacute; altre?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Pots donar la culpa a algú altre?")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 50)
            console.log(`Pots donar la culpa a algú altre? ${resposta}`)
        },
        comptaLH: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Llen&ccedil;a-ho!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("Llença-ho!")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
            console.log(`Llença-ho!`)
        },
        comptaFinal: function() {
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">FINS A LA PROPERA!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push("FINAL!")
            text2.innerHTML = `<p id="caminet">[${caminet}]</p>`
            setTimeout(() => {
                this.emit("timeout")
            }, 2000)
            console.log(`Fins a la propera!`)
            throw new Error(0)
        }
    }
})