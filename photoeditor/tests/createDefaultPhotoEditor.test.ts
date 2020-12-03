import { createDefaultEditor } from '../myEditorActions'
import { photoEditorType } from '../myEditorModels'

const newDefaultPhotoEditor: photoEditorType = {
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

describe('createDefaultEditor', () => {
    test(' test createDefaultEditor function', () => {
        expect(createDefaultEditor()).toStrictEqual(newDefaultPhotoEditor)
    })
})
