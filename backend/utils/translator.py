from googletrans import Translator

translator = Translator()

def translate_response(data, lang):
    def translate_item(item):
        if isinstance(item, list):
            return [translate_item(i) for i in item]
        elif isinstance(item, dict):
            return {k: translate_item(v) for k, v in item.items()}
        elif isinstance(item, str):
            return translator.translate(item, dest=lang).text
        return item

    return translate_item(data)
