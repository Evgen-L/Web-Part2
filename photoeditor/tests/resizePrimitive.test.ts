import { createDefaultEditor, resizePrimitive } from '../myEditorActions'
import { photoEditorType, sizeType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newSize: sizeType = {
    width: 100,
    height: 33
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: {
            ...photoEditor.currentState.currentObject,
            size: newSize 
        }
    }
}

describe('resizePrimitive', () => {
    test('new primitive size', () => {
        expect(resizePrimitive(photoEditor, newSize)).toStrictEqual(newPhotoEditor)
    })
})
