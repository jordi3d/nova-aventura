//
// Màquina d'Estats Finits amb JavaScript per controlar els esdeveniments
//

function automat(ajustos) {
    this._actual = ajustos.estatInicial
    this.accions = ajustos.accions
    this.estats = ajustos.estats
}

let prototip = automat.prototype

prototip.emit = function(esdeveniment) {
    let estat = this.estats[this._actual]
    let transicio = estat[esdeveniment]
    if (!transicio) {
        throw new Error(
            `Esdeveniment(${esdeveniment}) de l'actual` +
            ` estat(${this._actual}) no existeix.`,
        )
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

let estatAutomat = new automat({
    estatInicial: 'inicial', // Estat Inicial
    estatFinal: 'final', // Estat Final

    // Tots els estats possibles. Descriu els esdeveniments per passar de l'estat actual al següent
    // i les accions que s'han de fer a partir d'aquest punt.

    estats: {
        inicial: {
            // des de l'estat
            engega: {
                // esdeveniment
                a: 'funciona', // passa a l'estat
                accions: ['comptaFunciona'], // accions a fer
            },
        },

        funciona: {
            funcionaSi: {
                a: 'nohotoquis',
                accions: ['comptaNHT'],
            },
            funcionaNo: {
                a: 'hohastocat',
                accions: ['comptaHHT'],
            },
        },

        nohotoquis: {
            timeout: {
                a: 'capproblema',
                accions: ['comptaNP'],
            },
        },

        hohastocat: {
            hohastocatSi: {
                a: 'burro',
                accions: ['comptaB'],
            },
            hohastocatNo: {
                a: 'ensdonaraproblemes',
                accions: ['comptaEDP'],
            },
        },

        lhascagat: {
            timeout: {
                a: 'potsdonarlaculpa',
                accions: ['comptaPDLCAA'],
            },
        },

        capproblema: {
            timeout: {
                a: 'final',
                accions: ['comptaFinal'],
            },
        },

        hosapalgu: {
            hosapalguSi: {
                a: 'ensdonaraproblemes',
                accions: ['comptaEDP'],
            },
            hosapalguNo: {
                a: 'amagaho',
                accions: ['comptaAH'],
            },
        },

        ensdonaraproblemes: {
            ensdonaraproblemesSi: {
                a: 'lhascagat',
                accions: ['comptaLHC'],
            },
            ensdonaraproblemesNo: {
                a: 'llensaho',
                accions: ['comptaLH'],
            },
        },

        amagaho: {
            timeout: {
                a: 'capproblema',
                accions: ['comptaNP'],
            },
        },

        burro: {
            timeout: {
                a: 'hosapalgu',
                accions: ['comptaHSA'],
            },
        },

        potsdonarlaculpa: {
            potsdonarlaculpaSi: {
                a: 'capproblema',
                accions: ['comptaNP'],
            },
            potsdonarlaculpaNo: {
                a: 'lhascagat',
                accions: ['comptaLHC'],
            },
        },

        llensaho: {
            timeout: {
                a: 'capproblema',
                accions: ['comptaNP'],
            },
        },

        final: {
            timeout: {
                a: 'final',
                accions: [''],
            },
        },
    },

    accions: {
        comptaFunciona: function() {
            alert('funciona')
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Funciona?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Funciona?')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            let resposta = check_sn('Funciona? ')
            console.log(`Funciona? ${resposta}`)
            if (resposta === 's') this.emit('funcionaSi')
            else this.emit('funcionaNo')
        },
        comptaNHT: function() {
            console.log(`No ho toquis!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">No ho toquis!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('No ho toquis!')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaHHT: function() {
            alert("funciona no");
            let resposta = check_sn('Ho has tocat? ')
            console.log(`Ho has tocat? ${resposta}`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho has tocat?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Ho has tocat?')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            if (resposta === 's') this.emit('hohastocatSi')
            else this.emit('hohastocatNo')
        },
        comptaLHC: function() {
            console.log(`L'has cagat!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = `<p id="missatge_estat">L'has cagat!</p>`
            let text2 = document.getElementById('caminet')
            caminet.push("L'has cagat!")
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaNP: function() {
            console.log(`Cap problema!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Cap problema!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Cap Problema!')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaHSA: function() {
            let resposta = check_sn('Ho sap algú? ')
            console.log(`Ho sap algú? ${resposta}`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ho sap alg&uacute;?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Ho sap alg&uacute;?')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>` //per alguna raó, no s'actualitza el DOM
            if (resposta === 's') this.emit('hosapalguSi')
            else this.emit('hosapalguNo')
        },
        comptaEDP: function() {
            let resposta = check_sn('Ens donarà problemes? ')
            console.log(`Ens donarà problemes? ${resposta}`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Ens donar&agrave; problemes?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Ens donar&agrave; problemes?')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            if (resposta === 's') this.emit('ensdonaraproblemesSi')
            else this.emit('ensdonaraproblemesNo')
        },
        comptaAH: function() {
            console.log(`Amaga-ho!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Amaga-ho!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Amaga-ho')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaB: function() {
            console.log(`Burro!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Burro!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Burro!')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaPDLCAA: function() {
            let resposta = check_sn('Pots donar la culpa a algú altre? ')
            console.log(`Pots donar la culpa algú altre? ${resposta}`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML =
                '<p id="missatge_estat">Pots donar la culpa a alg&uacute; altre?</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Pots donar la culpa a algú altre?')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            if (resposta === 's') this.emit('potsdonarlaculpaSi')
            else this.emit('potsdonarlaculpaNo')
        },
        comptaLH: function() {
            console.log(`Llença-ho!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">Llen&ccedil;a-ho!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('Llença-ho!')
            text2.innerHTML = `<p id="caminet">[ ${caminet} ]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 1000)
        },
        comptaFinal: function() {
            console.log(`Fins a la propera!`)
            let text = document.getElementById('missatge_estat')
            text.innerHTML = '<p id="missatge_estat">FINS A LA PROPERA!</p>'
            let text2 = document.getElementById('caminet')
            caminet.push('FINAL!')
            text2.innerHTML = `<p id="caminet">[${caminet}]</p>`
            setTimeout(() => {
                this.emit('timeout')
            }, 500)
            throw new Error(0)
        },
    },
})