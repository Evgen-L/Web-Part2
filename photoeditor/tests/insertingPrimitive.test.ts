import { createDefaultEditor, insertingPrimitive} from '../myEditorActions'
import { photoEditorType, primitiveType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newPrim: primitiveType = {
    size: {
        width: 6,
        height: 7
    },
    point: {
        x: 5,
        y: 11
    },
    primitiveChoose: 'circle'
}


const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: newPrim 
    }
}

describe('insertingPrimitive', () => {
    test('inserting primitive', () => {
        expect(insertingPrimitive(photoEditor, newPrim)).toStrictEqual(newPhotoEditor)
    })
})