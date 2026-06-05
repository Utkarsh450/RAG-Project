from rapidocr_onnxruntime import RapidOCR

engine = RapidOCR()

def extract_image_text(image_path):
    result, _ = engine(image_path)

    text = "\n".join(
        [item[1] for item in result]
    )

    return text