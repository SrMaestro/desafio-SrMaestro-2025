class AbrigoAnimais {
  constructor() {
    this.ANIMALS = {
      REX: { name: "Rex", type: "cao", toys: ["RATO", "BOLA"] },
      MIMI: { name: "Mimi", type: "gato", toys: ["BOLA", "LASER"] },
      FOFO: { name: "Fofo", type: "gato", toys: ["BOLA", "RATO", "LASER"] },
      ZERO: { name: "Zero", type: "gato", toys: ["RATO", "BOLA"] },
      BOLA: { name: "Bola", type: "cao", toys: ["CAIXA", "NOVELO"] },
      BEBE: { name: "Bebe", type: "cao", toys: ["LASER", "RATO", "BOLA"] },
      LOCO: { name: "Loco", type: "jabuti", toys: ["SKATE", "RATO"] },
    };

    this.VALID_TOYS = new Set(
      Object.values(this.ANIMALS).flatMap((a) => a.toys)
    );
  }

  // ==== Helpers ====

  //Trasforma a string em array, para ser mais facil de lidar com o dados
  parseList(str) {
    if (!str || typeof str !== "string") return [];
    return str
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  //Verifica se tem duplicatas
  hasDuplicates(arr) {
    const upCase = arr.map((x) => x.toUpperCase());
    //Verifica se o tamnho do array e diferente do Set, se sim existe itens duplicados
    return new Set(upCase).size !== upCase.length;
  }

  isValidToyList(list) {
    const upCase = list.map((s) => s.toUpperCase());
    if (this.hasDuplicates(upCase)) return false;
    //Verifica se existem validos, se nao retorna false
    for (const t of upCase) if (!this.VALID_TOYS.has(t)) return false;
    return true;
  }

  isValidAnimalsList(list) {
    const up = list.map((s) => s.trim().toUpperCase());
    //Se fuplicado retorna falso
    if (this.hasDuplicates(up)) return false;
    //Se o animal existir retorna falso
    for (const a of up) if (!this.ANIMALS[a]) return false;
    return true;
  }

  isSubsequence(personArr, animalToys) {
    let j = 0;
    for (let i = 0; i < personArr.length && j < animalToys.length; i++) {
      if (personArr[i] === animalToys[j]) j++;
    }
    return j === animalToys.length;
  }

  containsAll(personArrSet, animalToys) {
    return animalToys.every((t) => personArrSet.has(t));
  }

  // ==== Principal ====
  encontraPessoas(brinquedos1Str, brinquedos2Str, animaisStr) {
    const p1 = this.parseList(brinquedos1Str);
    const p2 = this.parseList(brinquedos2Str);
    const animalsOrder = this.parseList(animaisStr);

    // validações
    if (!this.isValidToyList(p1) || !this.isValidToyList(p2)) {
      return { erro: "Brinquedo inválido" };
    }
    if (!this.isValidAnimalsList(animalsOrder)) {
      return { erro: "Animal inválido" };
    }

    const p1Upper = p1.map((x) => x.toUpperCase());
    const p2Upper = p2.map((x) => x.toUpperCase());
    const p1Set = new Set(p1Upper);
    const p2Set = new Set(p2Upper);

    let p1Count = 0,
    p2Count = 0;
    const results = [];

    for (const animalRaw of animalsOrder) {
      const key = animalRaw.trim().toUpperCase();
      const animal = this.ANIMALS[key];

      let p1Eligible = false;
      let p2Eligible = false;

      if (key === "LOCO") {
        // Loco: ordem não importa, precisa companhia já adotada
        p1Eligible = this.containsAll(p1Set, animal.toys) && p1Count >= 1;
        p2Eligible = this.containsAll(p2Set, animal.toys) && p2Count >= 1;
      } else {
        p1Eligible = this.isSubsequence(
          p1Upper,
          animal.toys.map((t) => t.toUpperCase())
        );
        p2Eligible = this.isSubsequence(
          p2Upper,
          animal.toys.map((t) => t.toUpperCase())
        );
      }

      if (p1Eligible && p2Eligible) {
        results.push({ name: animal.name, who: "abrigo" });
      } else if (p1Eligible) {
        if (p1Count < 3) {
          results.push({ name: animal.name, who: "pessoa 1" });
          p1Count++;
        } else {
          results.push({ name: animal.name, who: "abrigo" });
        }
      } else if (p2Eligible) {
        if (p2Count < 3) {
          results.push({ name: animal.name, who: "pessoa 2" });
          p2Count++;
        } else {
          results.push({ name: animal.name, who: "abrigo" });
        }
      } else {
        results.push({ name: animal.name, who: "abrigo" });
      }
    }

    const lista = results
      .map((r) => `${r.name} - ${r.who}`)
      .sort((a, b) => {
        const nameA = a.split(" - ")[0].toUpperCase();
        const nameB = b.split(" - ")[0].toUpperCase();
        return nameA.localeCompare(nameB);
      });

    return { lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
