let logs = []
let highestRNG = 0

const hash = window.location.hash.substr(1).split("&")

function main() {
	let level = 0
	while (1 == 1) {
		const canNext = Math.random() > 0.5
		if (canNext) {
			level += 1
		} else {
			break
		}
	}

	const element = document.getElementById('rngdisplay')
	element.style.setProperty('--rng-level', level)
	let text = `RNG ${level}: 1 in ${Math.pow(2, level) >= 100000 ? Math.pow(2, level).toPrecision(5) : Math.pow(2, level).toString()}`
    if (hash.includes('nosci')) {
        text = `RNG ${level}: 1 in ${Math.pow(2, level).toString()}`
    }
    element.textContent = text
    logs.push(text)
    if (level > highestRNG) {
        highestRNG = level
    }
}

function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`jwklong's RNG Logs\nRNGs done: ${logs.length}\nHighest RNG: ${highestRNG}\n\n${logs.join('\n')}`));       element.setAttribute('download', "rnglogs.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

main()

if (hash.includes('light')) {
    document.head.innerHTML += '<link rel="stylesheet" href="light.css">'
}

if (hash.includes('auto')) {
    document.getElementById('tryagainbtn').style.setProperty('display', 'none')
    
    function auto() {
        main()
        requestAnimationFrame(auto)
    }
    auto()
}
