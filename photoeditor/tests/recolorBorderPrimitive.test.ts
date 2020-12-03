import { createDefaultEditor, recolorBorderPrimitive } from '../myEditorActions'
import { photoEditorType, colorType} from '../myEditorModels'

const photoEditor:  photoEditorType = createDefaultEditor()
const newColor: colorType = {
    r: 255,
    g: 0,
    b: 0,
    a: 255
}

const newphotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        primitiveSettings: {
            ...photoEditor.currentState.primitiveSettings,
            borderColor: newColor  
        }
    }
}

describe('recolorBorderPrimitive', () => {
    test('new color border primitive', () => {
        expect(recolorBorderPrimitive(photoEditor, newColor)).toStrictEqual(newphotoEditor)
    })
})