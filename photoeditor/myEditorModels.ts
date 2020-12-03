export type pointType = {
    x: number,
    y: number
};

export type sizeType = {
    width: number,
    height: number
};

export type colorType = {
    r: number,
    g: number,
    b: number,
    a: number
};

//  export type rectangleType = {
//     color: colorType 
// };

// export type circleType = {
//     point: pointType,
//     size: sizeType
// };

// export type triangleType = {
//     point: pointType,
//     size: sizeType
// };

export type primitiveChooseType = 'triangle' | 'circle' | 'rectangle';

export type primitiveSettingsType = {
    backgroundColor: colorType,
    borderColor: colorType,
    borderSize: number
};

export type primitiveType = {
    size: sizeType,
    point: pointType,
    primitiveChoose: primitiveChooseType
};

export type artObjectType = {
    size: sizeType,
    filePath: string,
    point: pointType
};

export type filtersType = 'red' | 'blue' | 'green' | 'yellow' | 'none';

export type textType = {
    size: sizeType,
    value: string,
    point: pointType,
};

export type textSettingsType = {
    color: colorType,
    font: string,
    textSize: number
};

export type imageType = {
   filePath: string,
   size: sizeType 
};


export type spaceType = ImageData

export type highlightedAreaType = {
    size: sizeType,
    point: pointType
}

export type currentObjectType = primitiveType| artObjectType| highlightedAreaType| textType

export type currentStateType = {
    filter: filtersType,
    currentObject: currentObjectType,
    primitiveSettings: primitiveSettingsType,
    textSettings: textSettingsType
};

export type historyType = {
    redo: Array<photoEditorType>,
    undo: Array<photoEditorType>
};



export type photoEditorType = {
    space: spaceType,
    currentState: currentStateType,
    actionHistory: historyType
};
