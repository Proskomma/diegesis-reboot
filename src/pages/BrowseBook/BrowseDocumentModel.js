import React from 'react';
import {Link} from 'react-router-dom';

const {ScriptureParaDocument} = require('proskomma-render');

class BrowseDocumentModel extends ScriptureParaDocument {

    constructor(result, context, config) {
        super(result, context, config);
        config.rendered = [];
        config.blockStack = [];
        config.currentChapter = null;
        config.currentVerses = null;
        addActions(this);
    }
}

const addActions = (dInstance) => {
    dInstance.addAction(
        'startDocument',
        () => true,
        renderer => {
            renderer.config.nextKey = 0;
        }
    );
    dInstance.addAction(
        'startBlock',
        () => true,
        renderer => {
            renderer.config.blockStack = [];
        }
    );
    dInstance.addAction(
        'token',
        () => true,
        (renderer, context, data) => {
            if (data.subType === 'wordLike') {
                const attScopes = Array.from(context.sequenceStack[0].openScopes)
                    .filter(s => s.startsWith('attribute'))
                    .filter(s => ['strong', 'lemma', 'x-strong', 'x-lemma', 'x-content'].includes(s.split('/')[3]))
                    .map(s => [s.split('/')[3], s.split('/')[5]]);
                const state = {newSearchString: data.payload};
                attScopes.forEach(s => state[s[0] = s[1]])
                renderer.config.blockStack.push(
                    <Link
                        to={{
                            pathname: "/search/text",
                            state
                        }}
                        key={renderer.config.nextKey++}
                        className="browserWord"
                    >
                        {data.payload}
                    </Link>
                );
            } else {
                renderer.config.blockStack.push(data.payload);
            }
        }
    );
    dInstance.addAction(
        'scope',
        () => true,
        (renderer, context, data) => {
            const scopeName = data.payload.split('/')[0];
            const scopeValue = data.payload.split('/').slice(1).join('/');
            if (data.subType === 'start' && scopeName === 'verses') {
                renderer.config.currentVerses = scopeValue;
                const currentChapter = renderer.config.currentChapter;
                let verseRef = null;
                let className = "verses_label";
                if (
                    renderer.config.currentChapter === renderer.config.selectedChapter &&
                    renderer.config.currentVerses === renderer.config.selectedVerses
                ) {
                    verseRef = renderer.config.selectedVerseRef;
                    className = "selected_verses_label";
                }
                renderer.config.blockStack.push(
                    <span
                        id={`v_${renderer.config.currentChapter}_${scopeValue}`}
                        onClick={() => renderer.config.versesCallback(currentChapter, scopeValue)}
                        ref={verseRef}
                        key={renderer.config.nextKey++}
                        className={className}
                    >
                        {scopeValue}
                    </span>);
            } else if (data.subType === 'end' && scopeName === 'verses') {
                renderer.config.currentVerses = null;
            } else if (data.subType === 'start' && scopeName === 'chapter') {
                renderer.config.currentChapter = scopeValue;
                renderer.config.blockStack.push(
                    <span
                        key={renderer.config.nextKey++}
                        className="chapter_label"
                    >
                        {scopeValue}
                    </span>);
            }
        }
    );
    dInstance.addAction(
        'endBlock',
        () => true,
        (renderer, context) => {
            const pRef = renderer.config.rendered.length === 0 ? renderer.config.topDocRef : null;
            const key = renderer.config.nextKey++;
            renderer.config.rendered.push(
                <p key={key}
                   id={key}
                   ref={pRef}
                   className={'usfm_' + context.sequenceStack[0].block.blockScope.split('/')[1]}
                >
                    {renderer.config.blockStack}
                </p>
            );
        }
    );
}

export default BrowseDocumentModel;
