// --- Calc Class
class Calc {
  constructor() {
    // current value
    this.current = "";
    // input value
    this.input = "";
    // memory value
    this.memory = "";

    this.operation = null;
  }

  // f add
  add() {
    this.current += this.input;
  }

  // f sub
  sub() {
    this.current -= this.input;
  }

  // f multi
  multi() {
    this.current *= this.input;
  }

  // f div
  div() {
    if (this.input === 0) {
      this.current = "ERROR";
    } else {
      this.current /= this.input;
    }

  }

  // f exp
  exp() {
    this.current **= this.input;
  }

  // f inv
  inv() {
    if (this.current === 0) {
      this.current = "ERROR";
    } else {
      this.current = 1 / this.current;
    }
  }

  // f sqrt
  sqrt() {
    if (this.current < 0) {
      this.current = "ERROR";
    } else {
      this.current = Math.sqrt(this.current);
    }
  }

  // f perc, NOT REALLY AN OPERATION
  perc() {
    if (this.current !== "") {
      this.input = this.current * this.input / 100;
    } else {
      this.input = this.input / 100;
    }
  }

  // f equals
  equals() {
    this.operation();
  }

  // f m store
  memoryStore() {
    if (this.input !== "") {
      this.memory = this.input;
    } else {
      this.memory = this.current;
    }
  }

  // f m recall
  memoryRecall() {
    if (this.memory !== "") {
      return this.memory;
    } else {
      return "";
    }
  }
  // f m clear 
  memoryClear() {
    this.memory = "";
  }

  // f m add
  memoryAdd() {
    if (this.input !== "") {
      this.memory += this.input;
    } else {
      this.memory += this.current;
    }
  }
  // f m sub
  memorySub() {
    if (this.input !== "") {
      this.memory -= this.input;
    } else {
      this.memory -= this.current;
    }
  }
  // --- end Calc class
}


const calc = new Calc();

// Initialise
document.addEventListener("DOMContentLoaded", event => {

  bindNumbers();

  bindOperations();

  bindFormatting();

  bindMemory();

  // Bind keypresses
});

// Bind event handlers to number buttons
function bindNumbers() {
  document.querySelectorAll("#keyboard-container .btn-number").forEach(element => {
    element.addEventListener("click", event => {
      console.log("Before NUM:\n INP:" + calc.input + "\nCUR:" + calc.current);
      calc.input += "" + element.innerHTML;
      write(calc.input);
      console.log("After NUM:\n INP:" + calc.input + "\nCUR:" + calc.current);
    });
  });
}

// Bind event handlers operation buttons
function bindOperations() {
  //add pushed
  bindOperation("btn-add", calc.add);

  //sub pushed
  bindOperation("btn-sub", calc.sub);

  //multi pushed
  bindOperation("btn-multi", calc.multi);

  //div pushed
  bindOperation("btn-div", calc.div);

  //  exp pushed
  bindOperation("btn-exp", calc.exp);

  //  inv pushed
  bindOperationUnary("btn-inv", calc.inv);

  //  sqrt pushed
  bindOperationUnary("btn-sqrt", calc.sqrt);


  //  perc pushed
  document.getElementById("btn-perc").addEventListener("click", event => {
    calc.perc();
    if (calc.operation !== null) {
      document.getElementById("btn-eq").click();
    } else {
      write(calc.input);
    }
  });


  // equals pushed
  document.getElementById("btn-eq").addEventListener("click", event => {
    calc.equals();
    write(calc.current);
    if (calc.current === "ERROR") {
      calc.current = 0;
    }
    calc.input = "";
    calc.operation = null;
  });
}

// Bind event handlers to formatting keys
function bindFormatting() {
  // Plus Minus pushed
  document.getElementById("btn-plusminus").addEventListener("click", event => {
    write(-read());
  });

  // Decimal Separator pushed
  document.getElementById("btn-separator").addEventListener("click", event => {
    write(read() + ".");
    calc.input += ".";
  });

  // Backspace pushed
  document.getElementById("btn-bkspace").addEventListener("click", event => {
    write(String(document.getElementById("output-field").value).slice(0, -1));
    calc.input = document.getElementById("output-field").value;
  });

  // C pushed (clear all)
  document.getElementById("btn-c").addEventListener("click", event => {
    write("");
    calc.current = "";
    calc.input = "";
    calc.operation = null;
  });

  // CE pushed (clear input)
  document.getElementById("btn-ce").addEventListener("click", event => {
    write("");
    calc.input = "";
  });
}


// Bind memory
function bindMemory() {
  // MS pushed
  document.getElementById("btn-ms").addEventListener("click", event => {
    calc.memoryStore();
  });

  // MR pushed
  document.getElementById("btn-mr").addEventListener("click", event => {
    if (calc.memoryRecall() !== "") {
      write(calc.memoryRecall());
    }
  });

  // M+ pushed
  document.getElementById("btn-mp").addEventListener("click", event => {
    calc.memoryAdd();
  });

  // M- pushed
  document.getElementById("btn-mm").addEventListener("click", event => {
    calc.memorySub();
  });

  // MC pushed
  document.getElementById("btn-mc").addEventListener("click", event => {
    calc.memoryClear();
  });
}


// Read input
function read() {
  return parseFloat(document.getElementById("output-field").value) || 0;

}

// Write output
function write(value) {
  document.getElementById("output-field").value = value;
  calc.input = read();
}




function bindOperation(btnid, opfunc) {
  document.getElementById(btnid).addEventListener("click", event => {
    setOperation(opfunc);
  });
}

function bindOperationUnary(btnid, opfunc) {
  document.getElementById(btnid).addEventListener("click", event => {
    setOperation(opfunc);
    document.getElementById("btn-eq").click();
  });
}

function setOperation(op) {
  if (calc.input !== "" && calc.current !== "" && calc.operation !== null) {
    document.getElementById("btn-eq").click();

  }
  calc.operation = op;
  if (calc.input !== "") {
    calc.current = parseFloat(calc.input);
    calc.input = "";
  }
}