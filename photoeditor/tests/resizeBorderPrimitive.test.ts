import {createDefaultEditor, resizeBorderPrimitive} from '../myEditorActions'
import { photoEditorType } from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newSize = 12

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        primitiveSettings: {
            ...photoEditor.currentState.primitiveSettings,
            borderSize: newSize
        }
    }
    
}

describe('resizeBorderPrimitive', () => {
    test('new size border primitive', () => {
        expect(resizeBorderPrimitive(photoEditor, newSize)).toStrictEqual(newPhotoEditor)
    })
})

