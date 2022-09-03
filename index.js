const givenBlocks = ['R1', 'R1', 'R3', 'R1', 'R1', 'L2', 'R5', 'L2', 'R5', 'R1', 'R4', 'L2', 'R3', 'L3', 'R4', 'L5', 'R4', 'R4', 'R1', 'L5', 'L4', 'R5', 'R3', 'L1', 'R4', 'R3', 'L2', 'L1', 'R3', 'L4', 'R3', 'L2', 'R5', 'R190', 'R3', 'R5', 'L5', 'L1', 'R54', 'L3', 'L4', 'L1', 'R4', 'R1', 'R3', 'L1', 'L1', 'R2', 'L2', 'R2', 'R5', 'L3', 'R4', 'R76', 'L3', 'R4', 'R191', 'R5', 'R5', 'L5', 'L40', 'L5', 'L3', 'R1', 'R3', 'R2', 'L2', 'L2', 'L4', 'L5', 'L4', 'R5', 'R4', 'R4', 'R2', 'R3', 'R4', 'L3', 'L2', 'R5', 'R3', 'L2', 'L1', 'R2', 'L3', 'R2', 'L1', 'L1', 'R1', 'L3', 'R5', 'L5', 'L1', 'L2', 'R5', 'R3', 'L3', 'R3', 'R5', 'R2', 'R5', 'R5', 'L5', 'L5', 'R25', 'L3', 'L5', 'L2', 'L1', 'R2', 'R2', 'L2', 'R2', 'L3', 'L2', 'R3', 'L5', 'R4', 'L4', 'L5', 'R3', 'L4', 'R1', 'R3', 'R2', 'R4', 'L2', 'L3', 'R2', 'L5', 'R5', 'R4', 'L2', 'R4', 'L1', 'L3', 'L1', 'L3', 'R1', 'R2', 'R1', 'L5', 'R5', 'R3', 'L3', 'L3', 'L2', 'R4', 'R2', 'L5', 'L1', 'L1', 'L5', 'L4', 'L1', 'L1', 'R1'];
const cardinalPoints = ['north', 'east', 'south', 'west'];

const getShortestWay = (givenBlocks, cardinalPoints) => {
    let k = 1; // coefficient for north/west, east/south pair
    const coordinatesArray = [...cardinalPoints];
    let horizontalPath = 0; // west/east shortest path
    let verticalPath = 0; // north/south shortest path

    givenBlocks.forEach((item) => {
        const direction = item[0];
        const blocksNumber = item.split(/R|L/)[1];
        const kDirection = direction === 'R' ? 1 : -1; // coefficient for right/left directions

        // found coefficient for north/west, east/south pair
        switch (coordinatesArray[0] === 'north' || coordinatesArray[0] === 'west') {
            case true:
                k = 1;
                break;
            case false:
                k = -1;
        }

        // change current cardinal point (first item of array cardinal Points)
        if (direction === 'R') coordinatesArray.push(coordinatesArray.shift())
        else coordinatesArray.unshift(coordinatesArray.pop());

        // add current blocks number(with direction coefficient) to horizontal or vertical value
        switch (coordinatesArray[0] === 'west' || coordinatesArray[0] === 'east') {
            case true:
                horizontalPath += k * (+blocksNumber * kDirection);
                break;
            case false:
                verticalPath += k * (+blocksNumber * kDirection);
    }});

    // sum of absolute values of two major direction
    return Math.abs(horizontalPath) + Math.abs(verticalPath);
};

console.log('tests start');
console.log(`Shortest path of ${['R2', 'L3']} is ${getShortestWay(['R2', 'L3'], cardinalPoints)}`);
console.log(`Shortest path of ${['R2', 'R2', 'R2']} is ${getShortestWay(['R2', 'R2', 'R2'], cardinalPoints)}`);
console.log(`Shortest path of ${['R5', 'L5', 'R5', 'R3']} is ${getShortestWay(['R5', 'L5', 'R5', 'R3'], cardinalPoints)}`);
console.log(`Shortest path of ${['R6', 'L3', 'L7', 'R1', 'L5', 'R8']} is ${getShortestWay(['R6', 'L3', 'L7', 'R1', 'L5', 'R8'], cardinalPoints)}`);
console.log(`Shortest path of ${['R1', 'L1', 'R2', 'L4', 'L5', 'L3', 'L2', 'R1']} is ${getShortestWay(['R1', 'L1', 'R2', 'L4', 'L5', 'L3', 'L2', 'R1'], cardinalPoints)}`);
console.log(`Shortest path of ${['R3', 'L1', 'R1', 'R2', 'R7', 'R9', 'R3', 'R3', 'L6', 'L1', 'L12']} is ${getShortestWay(['R3', 'L1', 'R1', 'R2', 'R7', 'R9', 'R3', 'R3', 'L6', 'L1', 'L12'], cardinalPoints)}`);
console.log('tests end');


console.log(`Shortest path of ${givenBlocks} is ${getShortestWay(givenBlocks, cardinalPoints)}`);
