const matrix = [
    ['HTML', 'CSS', 'JavaScript'],
    ['Java', 'C++', 'Python'],
    ['Ruby', 'Go', 'Swift']
  ]
  
  const position = findJavaScript(matrix)
  console.log(position) // -> [0, 2]

function findJavaScript(matrix) {
    // tu código aquí
    let position = [];
    for(let i = 0; i < matrix.length;i++){
    let row = matrix[i];
      let index = row.indexOf('JavaScript');
      if(index > 0){
        position = [i,index];
        break;    
        
      }
    }
    return position;
  }

  function minAndMaxWord(words) {
    // tu código aquí
  }
const name = 'mono'
const subs = 5;
function createObject(name, subs) {
    // tu código aquí
    return {
        name: name,
        suscribers: subs,
        hash: name.length * subs,
        getStatus:  () => `el canal de ${name} tiene ${subs} suscriptiores`
          // 'el canal de ' + name + ' tiene ' + subs + ' suscriptiores'
      }
    
  }

  console.log(createObject(name,subs).getStatus())

  function getKeysOfBooleanValues(obj) {
    // tu código aquí
    const entries = Object.entries(obj);
    const resultArray = []
    entries.forEach((entrie) => {
      if(typeof(entrie[1]) === 'boolean'){
        resultArray.push(entrie[0]);
      }
    })
  return resultArray;
  }

  console.log(

    getKeysOfBooleanValues({ a: true, b: 42, c: false })
  );


  function searchInOcean(ocean, section, item) {
    // tu código aquí
  console.log(ocean[section]?.[item]);
  return ocean[section]?.[item] ? true : false;
  }

  console.log(

    searchInOcean({ deep: { treasure: "oro" }},"deep","treasure")
  );