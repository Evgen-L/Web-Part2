/* eslint-disable @typescript-eslint/no-unused-vars */
import { toEditorSettings } from "typescript";
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
    highlightedAreaType,
    currentObjectType,
    historyType,
    photoEditorType,
} from "./myEditorModels(v3)";

//create editor ------------------------------------------------------------------------------------------------------------------------------------
//function for применения полученных настроек к объекту. Вопрос, применятся ли настройки к объекту
//work with bufer obmening


function createDefaultEditor(): photoEditorType {
    return {
        space: new ImageData(800, 600),
        currentState: {
            filter: 'none',
            currentObject: null,
            primitiveSettings: {
                backgroundColor: 'white',
                borderColor: 'black',
                borderSize: 5,
            },
            textSettings: {
                color: 'black',
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
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function (prop) {
    // eslint-disable-next-line no-prototype-builtins
        if (
        // eslint-disable-next-line no-prototype-builtins
            o.hasOwnProperty(prop) &&
      o[prop] !== null &&
      (typeof o[prop] === "object" || typeof o[prop] === "function") &&
      !Object.isFrozen(o[prop])
        ) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
//undo
function undo(photoEditor: photoEditorType): photoEditorType {
    deepFreeze(photoEditor);
    const newPhotoEditor: photoEditorType = photoEditor;
    const newRedo = newPhotoEditor.actionHistory.redo;
    const newUndo = newPhotoEditor.actionHistory.undo;
    newRedo.push(newUndo.pop());
    return {
        ...newPhotoEditor,
        actionHistory: {
            redo: newRedo,
            undo: newUndo
        }
    }
}

//redo
function redo(photoEditor: photoEditorType): photoEditorType {
    deepFreeze(photoEditor);
    const newPhotoEditor: photoEditorType = photoEditor;
    const newRedo = newPhotoEditor.actionHistory.redo;
    const newUndo = newPhotoEditor.actionHistory.undo;
    newUndo.push(newRedo.pop());
    return {
        ...newPhotoEditor,
        actionHistory: {
            redo: newRedo,
            undo: newUndo
        }
    }
}

function highlightingArea(
    photoEditor: photoEditorType,
    newArea: highlightedAreaType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newArea,
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function moveSelectedArea(
    photoEditor: photoEditorType,
    newPosition: pointType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newPosition,
            },
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function cutOnSelection(photoEditor: photoEditorType): photoEditorType {
    //--------------------------------------
    deepFreeze(photoEditor);
    const newSpace: spaceType = photoEditor.space;
    const highlightedArea = photoEditor.currentState.currentObject;
    const yStart: number = highlightedArea.point.y;
    const xStart: number = highlightedArea.point.x;
    const yEnd: number = highlightedArea.size.height;
    const xEnd: number = highlightedArea.size.width;
    for (let y = yStart; y <= yEnd; y++) {
        const start: number = y * newSpace.width * 4 + xStart * 4;
        const end: number = y * newSpace.width * 4 + xEnd * 4 + 3;
        newSpace.data.fill(255, start, end);
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
function deletingSelectedArea(photoEditor: photoEditorType): photoEditorType {
    //--------------------------------------
    deepFreeze(photoEditor);
    const newSpace: spaceType = photoEditor.space;
    const highlightedArea = photoEditor.currentState.currentObject;
    const yStart: number = highlightedArea.point.y;
    const xStart: number = highlightedArea.point.x;
    const yEnd: number = yStart + highlightedArea.size.height;
    const xEnd: number = xStart + highlightedArea.size.width;
    const start: number = yStart * newSpace.width * 4 + xStart * 4;
    const end: number = yEnd * newSpace.width * 4 + xEnd * 4;
    return {
        ...photoEditor,
        space: new ImageData(newSpace.data.fill(255, start, end), newSpace.width, newSpace.height),
        currentState: {
            ...photoEditor.currentState,
            currentObject: null
        }
    }
}

function insertText(
    photoEditor: photoEditorType,
    newText: textType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newText,
        },
    };
}

function choiceTextSize(
    photoEditor: photoEditorType,
    newSize: number
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                textSize: newSize,
            },
        },
    };
}

function choiceBoxTextSize(
    photoEditor: photoEditorType,
    newSize: sizeType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                size: newSize,
            },
        },
    };
}

function changeTextColor(
    photoEditor: photoEditorType,
    newTextColor: colorType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                color: newTextColor,
            },
        },
    };
}

function changeTextPosition(
    photoEditor: photoEditorType,
    newTextPosition: pointType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newTextPosition,
            },
        },
    };
}

function changingColorText(
    photoEditor: photoEditorType,
    newColor: colorType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            textSettings: {
                ...photoEditor.currentState.textSettings,
                color: newColor,
            },
        },
    };
}

function insertingPrimitive(
    photoEditor: photoEditorType,
    newPrimitive: primitiveType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: newPrimitive,
        },
    };
}

function resizePrimitive(
    photoEditor: photoEditorType,
    newSize: sizeType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                size: newSize,
            },
        },
    };
}

function repositionPrimitive(
    photoEditor: photoEditorType,
    newPoint: pointType
): photoEditorType {
    //
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            currentObject: {
                ...photoEditor.currentState.currentObject,
                point: newPoint,
            },
        },
    };
}
/////////////////////
function fillingPrimitive(
    photoEditor: photoEditorType,
    newBackColor: colorType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            primitiveSettings: {
                ...photoEditor.currentState.primitiveSettings,
                backgroundColor: newBackColor,
            },
        },
    };
}

// function insertingArt(photoEditor: photoEditorType, filePath: string): photoEditorType {
//     deepFreeze(photoEditor);
//     return changeCanvas(photoEditor, data)
// }

function usingFilters(
    photoEditor: photoEditorType,
    newFilter: filtersType
): photoEditorType {
    deepFreeze(photoEditor);
    return {
        ...photoEditor,
        currentState: {
            ...photoEditor.currentState,
            filter: newFilter,
        },
    };
}

// function fromComp(photoEditor: photoEditorType, filePath: string): photoEditorType{
//     deepFreeze(photoEditor);
//     return (photoEditor)
// }

// function fromPixels(photoEditor: photoEditorType): Editor {
//     return (photoEditor)
// }

// function fromCamera(photoEditor: photoEditorType): Editor {
//     deepFreeze(photoEditor);
//     return (photoEditor)
// }

// function exportJPEG(photoEditor: photoEditorType): photoEditorType {
//     deepFreeze(photoEditor);
//     const file =
//       return file
// }

// function exportPNG(photoEditor: photoEditorType): photoEditorType {
//     deepFreeze(photoEditor);
//     return
// }
