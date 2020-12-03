import { createDefaultEditor, highlightingArea } from '../myEditorActions'
import { photoEditorType, highlightedAreaType } from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newHighlightedArea: highlightedAreaType = {
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

describe('highlightingArea', () => {
    test('newHighlightingArea', () => {
        expect(highlightingArea(photoEditor, newHighlightedArea)).toStrictEqual(newPhotoEditor)
    })
})