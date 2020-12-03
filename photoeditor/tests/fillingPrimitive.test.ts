import { createDefaultEditor, fillingPrimitive } from  '../myEditorActions'
import {photoEditorType, colorType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newbackgroundColor: colorType = {
    r: 255,
    g: 255,
    b: 0,
    a: 255
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        primitiveSettings: {
            ...photoEditor.currentState.primitiveSettings,
            backgroundColor: newbackgroundColor
        }
    }
}

describe('fillingPrimitive', () => {
    test('choise background primitive', () => {
        expect(fillingPrimitive(photoEditor, newbackgroundColor)).toStrictEqual(newPhotoEditor)
    })
}) 