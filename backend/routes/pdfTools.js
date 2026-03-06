const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const upload = multer({ dest: "uploads/" });

/* SIGN PDF */

router.post("/sign", upload.single("file"), async (req, res) => {
  try {

    const signature = req.body.signature;
    const filePath = req.file.path;

    const pdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const pngImage = await pdfDoc.embedPng(signature);

    firstPage.drawImage(pngImage, {
      x: 200,
      y: 100,
      width: 150,
      height: 80,
    });

    const newPdf = await pdfDoc.save();

    const output = `uploads/signed-${Date.now()}.pdf`;

    fs.writeFileSync(output, newPdf);

    res.download(output);

  } catch (error) {
    console.log(error);
    res.status(500).send("Sign error");
  }
});


/* MERGE PDF */

router.post("/merge", upload.array("files"), async (req, res) => {
  try {

    const mergedPdf = await PDFDocument.create();

    for (let file of req.files) {

      const pdfBytes = fs.readFileSync(file.path);

      const pdf = await PDFDocument.load(pdfBytes);

      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    const output = `uploads/merged-${Date.now()}.pdf`;

    fs.writeFileSync(output, mergedBytes);

    res.download(output);

  } catch (error) {
    console.log(error);
    res.status(500).send("Merge error");
  }
});


/* COMPRESS PDF */

router.post("/compress", upload.single("file"), async (req, res) => {
  try {

    const filePath = req.file.path;

    const pdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const compressed = await pdfDoc.save({
      useObjectStreams: true
    });

    const output = `uploads/compress-${Date.now()}.pdf`;

    fs.writeFileSync(output, compressed);

    res.download(output);

  } catch (error) {
    console.log(error);
    res.status(500).send("Compress error");
  }
});

module.exports = router;