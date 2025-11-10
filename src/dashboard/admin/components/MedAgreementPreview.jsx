import React, { useEffect } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const MedAgreementPreview = ({ formData, onBack, pdfContainerRef }) => {
  useEffect(() => {
    if (formData && pdfContainerRef.current) {
      generatePDFContent();
    }
  }, [formData, pdfContainerRef]);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const generatePDFContent = () => {
    if (!formData || !pdfContainerRef.current) return;

    const agreementDateDisplay = formatDateForDisplay(formData.agreementDate);

    // Similar to the HTML version, create the PDF content structure
    // This is a simplified version - you'd want to implement the full structure
    const pdfContent = `
      <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 40px;">
        <h1 style="font-size: 24pt; font-weight: bold; margin-bottom: 10px;">JustiFi - Mediation Agreement</h1>
        <p style="font-size: 14pt;"><strong>Date:</strong> ${agreementDateDisplay}</p>
      </div>
      <!-- Add the rest of the PDF content structure here -->
    `;

    pdfContainerRef.current.innerHTML = pdfContent;
  };

  const generatePDF = async () => {
    if (!pdfContainerRef.current) return;

    const downloadBtn = document.getElementById("download-pdf");
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "Generating PDF...";
    downloadBtn.disabled = true;

    try {
      const canvas = await html2canvas(pdfContainerRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: pdfContainerRef.current.scrollWidth,
        height: pdfContainerRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("mediation-agreement.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      downloadBtn.textContent = originalText;
      downloadBtn.disabled = false;
    }
  };

  if (!formData) return null;

  const agreementDateDisplay = formatDateForDisplay(formData.agreementDate);

  return (
    <div id="output-section" className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Generated Mediation Agreement</h2>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft />
          Back to Form
        </button>
      </div>

      {/* Agreement Preview */}
      <div
        id="agreement-preview"
        className="font-['Times_New_Roman',Times,serif] leading-relaxed text-sm bg-white p-8 border border-gray-300 rounded-lg"
      >
        {/* Add the full agreement preview content here */}
        <div className="text-center border-b-2 border-blue-800 pb-4 mb-8">
          <h1 className="text-2xl font-bold mb-2">
            JustiFi - Mediation Agreement
          </h1>
          <p className="text-lg">
            <strong>Date:</strong> {agreementDateDisplay}
          </p>
        </div>

        {/* Rest of the agreement content */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            THIS MEDIATION AGREEMENT
          </h2>
          <p className="mb-4 text-justify">
            (Hereinafter referred to as the "Agreement") is made and entered
            into by and between the following parties:
          </p>

          {/* Parties information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3 text-blue-600">
                PLAINTIFFS
              </h3>
              {formData.plaintiffs.map((plaintiff, index) => (
                <div
                  key={index}
                  className="mb-4 p-3 border border-gray-200 rounded"
                >
                  <p className="font-semibold">Plaintiff {index + 1}</p>
                  <p>
                    <strong>Name:</strong> {plaintiff.name}
                  </p>
                  <p>
                    <strong>Parents:</strong> {plaintiff.parents}
                  </p>
                  <p>
                    <strong>Email:</strong> {plaintiff.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {plaintiff.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {plaintiff.address}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {plaintiff.occupation}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3 text-red-600">
                DEFENDANTS
              </h3>
              {formData.defendants.map((defendant, index) => (
                <div
                  key={index}
                  className="mb-4 p-3 border border-gray-200 rounded"
                >
                  <p className="font-semibold">Defendant {index + 1}</p>
                  <p>
                    <strong>Name:</strong> {defendant.name}
                  </p>
                  <p>
                    <strong>Parents:</strong> {defendant.parents}
                  </p>
                  <p>
                    <strong>Email:</strong> {defendant.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {defendant.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {defendant.address}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {defendant.occupation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add the rest of the agreement sections */}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          id="download-pdf"
          onClick={generatePDF}
          className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <FaDownload />
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default MedAgreementPreview;
