const i18nTables = {
    en: {
        browse_passage_bible_reference: "Bible Reference",
    },
    fr: {
        browse_passage_bible_reference: "Référence Biblique",
    },
    es: {},
};

export default function i18n(lang, key) {
    if (!i18nTables[lang]) {
        return `NOLANG '${lang}'`
    }
    return i18nTables[lang][key] ||i18nTables['en'][key] || `??${key}??`;
}
