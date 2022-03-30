const i18nTables = {
    en: {
        browse_passage_bible_reference: "Bible Reference",
        show_all_bibles: "Show all Bibles",
        show_verses: "Show verses",
        group_version_show_verses: "Group by version, show verses",
        group_verse: "Group by verse",
        show_paragraphs: "Show paragraphs",
        group_version_show_paragraphs: "Group by version, show paragraphs",
        books_in: "books in",
        bibles: "Bibles",
    },
    fr: {
        browse_passage_bible_reference: "Référence Biblique",
    },
    es: {
        browse_passage_bible_reference: "Referencia Bíblica",
        show_all_bibles: "Mostrar todas las Biblias",
        show_verses: "Mostrar versos",
        group_version_show_verses: "Agrupar por versión, mostrar versos",
        group_verse: "Agrupar por verso",
        show_paragraphs: "Mostrar párrafos",
        group_version_show_paragraphs: "Agrupar por versión, mostrar párrafos",
        books_in: "libros en",
        bibles: "Biblias",
    },
};

export default function i18n(lang, key) {
    if (!i18nTables[lang]) {
        return `NOLANG '${lang}'`
    }
    return i18nTables[lang][key] ||i18nTables['en'][key] || `??${key}??`;
}
