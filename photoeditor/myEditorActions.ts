/* eslint-disable @typescript-eslint/no-unused-vars */
import { toEditorSettings } from 'typescript'
import {
    sizeType,
    colorType,
    pointType,
    primitiveChooseType,
    primitiveSettingsType,
    primitiveType,
    artObjectType,
    filtersType,
    textType,
    textSettingsType,
    imageType,
    spaceType,
    selectedAreaType,
    currentObjectType,
    historyType,
    photoEditorType,
} from './myEditorModels'


//work with bufer obmening


export function createDefaultEditor(): photoEditorType {
    return {
        space: null,
        currentState: {
            filter: 'none',
            currentObject: null,
            primitiveSettings: {
                backgroundColor: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 255
                }, 
                borderColor: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                },
                borderSize: 20,
            },
            textSettings: {
                color: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                },
                font: 'Calibri',
                textSize: 11
            }
        },
        actionHistory: {
            redo: [],
            undo: []
        }
    }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepFreeze(o: any): any {
    Object.freeze(o)

    Object.getOwnPropertyNames(o).forEach(function (prop) {
    // eslint-disable-next-line no-prototype-builtins
        if (
        // eslint-disable-next-line no-prototype-builtins
            o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
      !Object.isFrozen(o[prop])
        ) {
            deepFreeze(o[prop])
        }
    })
    return o
}

export function undo(photoEditor: photoEditorType): photoEditorType {
    deepFreeze(photoEditor)
    const newPhotoEditor: photoEditorType = photoEditor
    const newRedo = newPhotoEditor.actionHistory.redo
    const newUndo = newPhotoEditor.actionHistory.undo
    newRedo.push(newUndo.pop())
    return {
        ...newPhotoEditor,
        actionHistory: {
            redo: newRedo,
            undo: newUndo
        }
    }
}


export function redo(photoEditor: photoEditorType): photoEditorType {
    deepFreeze(photoEditor)
    const newPhotoEditor: photoEditorType = photoEditor
    const newRedo = newPhotoEditor.actionHistory.redo
    const newUndo = newPhotoEditor.actionHistory.undo
    newUndo.push(newRedo.pop())
    return {
        ...newPhotoEditor,
        actionHistory: {
            redo: newRedo,
            undo: newUndo
        }
    }
}

export function selectingArea(
    photoEditor: photoEditorType,
    newArea: selectedAreaType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newArea,
        },
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function repositionSelectedArea(
    photoEditor: photoEditorType,
    newPosition: pointType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newPosition,
            },
        },
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cutOnSelection(photoEditor: photoEditorType): photoEditorType {
    //--------------------------------------
    deepFreeze(photoEditor)
    const newSpace: spaceType = photoEditor.space
    const SelectedAreaType = photoEditor.currentState.currentObject
    const yStart: number = SelectedAreaType.point.y
    const xStart: number = SelectedAreaType.point.x
    const yEnd: number = SelectedAreaType.size.height
    const xEnd: number = SelectedAreaType.size.width
    for (let y = yStart; y <= yEnd; y++) {
        const start: number = y * newSpace.width * 4 + xStart * 4
        const end: number = y * newSpace.width * 4 + xEnd * 4 + 3
        newSpace.data.fill(255, start, end)
    }
    return {
        ...photoEditor,
        space: new ImageData(newSpace.data, newSpace.width, newSpace.height),
        currentState: {
            ...photoEditor.currentState,
            currentObject: null
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function deletingSelectedArea(photoEditor: photoEditorType): photoEditorType {
    //--------------------------------------
    deepFreeze(photoEditor)
    const newSpace: spaceType = photoEditor.space
    const SelectedAreaType = photoEditor.currentState.currentObject
    const yStart: number = SelectedAreaType.point.y
    const xStart: number = SelectedAreaType.point.x
    const yEnd: number = yStart + SelectedAreaType.size.height
    const xEnd: number = xStart + SelectedAreaType.size.width
    const start: number = yStart * newSpace.width * 4 + xStart * 4
    const end: number = yEnd * newSpace.width * 4 + xEnd * 4
    return {
        ...photoEditor,
        space: new ImageData(newSpace.data.fill(255, start, end), newSpace.width, newSpace.height),
        currentState: {
            ...photoEditor.currentState,
            currentObject: null
        }
    }
}

export function insertText(
    photoEditor: photoEditorType,
    newText: textType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newText,
        },
    }
}

export function choiceTextSize(
    photoEditor: photoEditorType,
    newSize: number
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                textSize: newSize,
            },
        },
    }
}

export function choiceBoxTextSize(
    photoEditor: photoEditorType,
    newSize: sizeType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                size: newSize,
            },
        },
    }
}

export function changeTextColor(
    photoEditor: photoEditorType,
    newTextColor: colorType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                color: newTextColor,
            },
        },
    }
}

export function changeTextPosition(
    photoEditor: photoEditorType,
    newTextPosition: pointType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newTextPosition,
            },
        },
    }
}

export function changingColorText(
    photoEditor: photoEditorType,
    newColor: colorType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                color: newColor,
            },
        },
    }
}

export function insertingPrimitive(
    photoEditor: photoEditorType,
    newPrimitive: primitiveType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newPrimitive,
        },
    }
}

export function resizePrimitive(
    photoEditor: photoEditorType,
    newSize: sizeType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                size: newSize,
            },
        },
    }
}

export function repositionPrimitive(
    photoEditor: photoEditorType,
    newPoint: pointType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newPoint,
            },
        },
    }
}
/////////////////////
export function fillingPrimitive(
    photoEditor: photoEditorType,
    newBackColor: colorType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            primitiveSettings: {
                ...photoEditor.currentState.primitiveSettings,
                backgroundColor: newBackColor,
            },
        },
    }
}

// export type primitiveSettingsType = {
//     
//     borderSize: number
// };

export function recolorBorderPrimitive(photoEditor: photoEditorType, newColor: colorType): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            primitiveSettings: {
                ...photoEditor.currentState.primitiveSettings,
                borderColor: newColor
            }
        }
    }
}

export function resizeBorderPrimitive(photoEditor: photoEditorType, newSize: number): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            primitiveSettings: {
                ...photoEditor.currentState.primitiveSettings,
                borderSize: newSize
            }
        }
    }
}

// export function insertingArt(photoEditor: photoEditorType, filePath: string): photoEditorType {
//     deepFreeze(photoEditor);
//     
// }

export function usingFilters(
    photoEditor: photoEditorType,
    newFilter: filtersType
): photoEditorType {
    deepFreeze(photoEditor)
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            filter: newFilter,
        },
    }
}

// export function fromComp(photoEditor: photoEditorType, filePath: string): photoEditorType{
//     deepFreeze(photoEditor);
//     return (photoEditor)
// }

// export function fromPixels(photoEditor: photoEditorType): Editor {
//     return (photoEditor)
// }

// export function fromCamera(photoEditor: photoEditorType): Editor {
//     deepFreeze(photoEditor);
//     return (photoEditor)
// }

// export function exportJPEG(photoEditor: photoEditorType): photoEditorType {
//     deepFreeze(photoEditor);
//     const file =
//       return file
// }

// export function exportPNG(photoEditor: photoEditorType): photoEditorType {
//     deepFreeze(photoEditor);
//     return
// }
