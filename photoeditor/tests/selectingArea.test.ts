import { createDefaultEditor, selectingArea } from '../myEditorActions'
import { photoEditorType, selectedAreaType } from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newHighlightedArea: selectedAreaType = {
    point: {
        x: 200,
        y: 10
    },
    size: {
        width: 9,
        height: 13
    }
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState:  {
        ...photoEditor.currentState,
        currentObject: newHighlightedArea
    }    
}

describe('selectingArea', () => {
    test('new selected Area', () => {
        expect(selectingArea(photoEditor, newHighlightedArea)).toStrictEqual(newPhotoEditor)
    })
})