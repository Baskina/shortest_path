const givenBlocks = ['R1', 'R1', 'R3', 'R1', 'R1', 'L2', 'R5', 'L2', 'R5', 'R1', 'R4', 'L2', 'R3', 'L3', 'R4', 'L5', 'R4', 'R4', 'R1', 'L5', 'L4', 'R5', 'R3', 'L1', 'R4', 'R3', 'L2', 'L1', 'R3', 'L4', 'R3', 'L2', 'R5', 'R190', 'R3', 'R5', 'L5', 'L1', 'R54', 'L3', 'L4', 'L1', 'R4', 'R1', 'R3', 'L1', 'L1', 'R2', 'L2', 'R2', 'R5', 'L3', 'R4', 'R76', 'L3', 'R4', 'R191', 'R5', 'R5', 'L5', 'L40', 'L5', 'L3', 'R1', 'R3', 'R2', 'L2', 'L2', 'L4', 'L5', 'L4', 'R5', 'R4', 'R4', 'R2', 'R3', 'R4', 'L3', 'L2', 'R5', 'R3', 'L2', 'L1', 'R2', 'L3', 'R2', 'L1', 'L1', 'R1', 'L3', 'R5', 'L5', 'L1', 'L2', 'R5', 'R3', 'L3', 'R3', 'R5', 'R2', 'R5', 'R5', 'L5', 'L5', 'R25', 'L3', 'L5', 'L2', 'L1', 'R2', 'R2', 'L2', 'R2', 'L3', 'L2', 'R3', 'L5', 'R4', 'L4', 'L5', 'R3', 'L4', 'R1', 'R3', 'R2', 'R4', 'L2', 'L3', 'R2', 'L5', 'R5', 'R4', 'L2', 'R4', 'L1', 'L3', 'L1', 'L3', 'R1', 'R2', 'R1', 'L5', 'R5', 'R3', 'L3', 'L3', 'L2', 'R4', 'R2', 'L5', 'L1', 'L1', 'L5', 'L4', 'L1', 'L1', 'R1'];
const cardinalPoints = ['north', 'east', 'south', 'west'];

const getShortestWay = (givenBlocks, cardinalPoints) => {
    let k = 1; // coefficient for north/west, east/south pair
    const coordinatesArray = [...cardinalPoints];
    let horizontalPath = 0; // west/east shortest path
    let verticalPath = 0; // north/south shortest path

    givenBlocks.forEach((item) => {
        const direction = item[0];
        const blocksNumber = item.substr(1);
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

console.log('=======tests start=======');

function test(desc, fn) {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
    } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
    }
}

function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}

test(`Shortest path of ${['R1000', 'R1']} is 1001`, () => {
    assert(getShortestWay(['R1000', 'R1'], cardinalPoints) === 1001);
});

test(`Shortest path of ${['R1000', 'L1']} is 1001`, () => {
    assert(getShortestWay(['R1000', 'L1'], cardinalPoints) === 1001);
});

test(`Shortest path of ${['R2', 'L3']} is 5`, () => {
    assert(getShortestWay(['R2', 'L3'], cardinalPoints) === 5);
});

test(`Shortest path of ${['R2', 'R2', 'R2']} is 2`, () => {
    assert(getShortestWay(['R2', 'R2', 'R2'], cardinalPoints) === 2);
});

test(`Shortest path of ${['R5', 'L5', 'R5', 'R3']} is 12`, () => {
    assert(getShortestWay(['R5', 'L5', 'R5', 'R3'], cardinalPoints) === 12);
});

test(`Shortest path of ${['R6', 'L3', 'L7', 'R1', 'L5', 'R8']} is 18`, () => {
    assert(getShortestWay(['R6', 'L3', 'L7', 'R1', 'L5', 'R8'], cardinalPoints) === 18);
});

test(`Shortest path of ${['R1', 'L1', 'R2', 'L4', 'L5', 'L3', 'L2', 'R1']} is 1`, () => {
    assert(getShortestWay(['R1', 'L1', 'R2', 'L4', 'L5', 'L3', 'L2', 'R1'], cardinalPoints) === 1);
});

test(`Shortest path of ${['R3', 'L1', 'R1', 'R2', 'R7', 'R9', 'R3', 'R3', 'L6', 'L1', 'L12']} is 12`, () => {
    assert(getShortestWay(['R3', 'L1', 'R1', 'R2', 'R7', 'R9', 'R3', 'R3', 'L6', 'L1', 'L12'], cardinalPoints) === 12);
});

test(`Shortest path of ${givenBlocks} is 254`, () => {
    assert(getShortestWay(givenBlocks, cardinalPoints) === 254);
});

console.log('=======tests end=======');
