// components/ArbAgreementPreview.js
import React, { useEffect } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ArbAgreementPreview = ({ formData, onBack, pdfContainerRef }) => {
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

    // Create PDF content (similar structure to the HTML version)
    const pdfContent = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24pt; font-weight: bold; margin-bottom: 10px;">⚖️ ARBITRATION AGREEMENT</h1>
        <p style="font-size: 14pt;"><strong>Date:</strong> ${agreementDateDisplay}</p>
      </div>
      
      <!-- Add the complete PDF content structure here -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">THIS ARBITRATION AGREEMENT</h2>
        <p style="margin-bottom: 20px;">(Hereinafter referred to as the "Agreement") is made and entered into by and between:</p>
        
        <!-- Parties information in PDF format -->
        <table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td width="50%" style="vertical-align: top; padding-right: 15px;">
              <h3 style="font-weight: bold; margin-bottom: 10px; color: #2563eb;">Party 1 – Claimant(s)/Plaintiff(s)</h3>
              ${formData.plaintiffs
                .map(
                  (plaintiff) => `
                <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
                  <p><strong>Name:</strong> ${plaintiff.name}</p>
                  <p><strong>Email:</strong> ${plaintiff.email}</p>
                  <p><strong>Phone:</strong> ${plaintiff.phone}</p>
                  <p><strong>Address:</strong> ${plaintiff.address}</p>
                  <p><strong>Occupation:</strong> ${plaintiff.occupation}</p>
                </div>
              `
                )
                .join("")}
              <p style="margin-top: 10px;">(Hereinafter referred to as the <strong>First Party</strong>)</p>
            </td>
            <td width="50%" style="vertical-align: top; padding-left: 15px;">
              <h3 style="font-weight: bold; margin-bottom: 10px; color: #dc2626;">Party 2 – Respondent(s)/Defendant(s)</h3>
              ${formData.defendants
                .map(
                  (defendant) => `
                <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
                  <p><strong>Name:</strong> ${defendant.name}</p>
                  <p><strong>Email:</strong> ${defendant.email}</p>
                  <p><strong>Phone:</strong> ${defendant.phone}</p>
                  <p><strong>Address:</strong> ${defendant.address}</p>
                  <p><strong>Occupation:</strong> ${defendant.occupation}</p>
                </div>
              `
                )
                .join("")}
              <p style="margin-top: 10px;">(Hereinafter referred to as the <strong>Second Party</strong>)</p>
            </td>
          </tr>
        </table>
        
        <p>Collectively referred to as the <strong>Parties</strong>, and individually as a <strong>Party</strong>.</p>
      </div>
      
      <!-- Add all the other sections (WHEREAS, Articles 1-10, etc.) -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">WHEREAS:</h2>
        <ol style="padding-left: 20px;">
          <li style="margin-bottom: 10px;">The Parties are involved in a legal dispute arising out of ${
            formData.disputeNature
          } ("Dispute");</li>
          <li style="margin-bottom: 10px;">The Parties have mutually agreed to refer the said Dispute to <strong>arbitration</strong>, to be conducted through the <strong>JustiFi – Online Legal Aid & Arbitration Platform</strong>, under its established rules and procedures;</li>
          <li style="margin-bottom: 10px;">The Parties desire to record their mutual understanding and agreement to the terms, conditions, and procedures governing such arbitration.</li>
        </ol>
      </div>
      
      <!-- Continue with all other sections... -->
      
      <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ccc;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">EXECUTION & SIGNATURES</h2>
        <p style="margin-bottom: 30px;"><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Arbitration Agreement on the date first written above.</p>
        
        <table width="100%" style="border-collapse: collapse;">
          <tr>
            <td width="33%" style="vertical-align: top; padding-right: 10px;">
              <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">Party 1 (First Party)</h3>
              <p style="text-align: center;">Plaintiffs/Claimants</p>
              ${formData.plaintiffs
                .map((plaintiff) => {
                  const signatureDate = formatDateForDisplay(
                    plaintiff.signatureDate
                  );
                  return `
                  <div style="margin-bottom: 30px; text-align: center;">
                    <p style="margin-bottom: 10px;"><strong>${
                      plaintiff.name
                    }</strong></p>
                    <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
                      ${
                        plaintiff.signature
                          ? `<img src="${plaintiff.signature}" alt="${plaintiff.name} Signature" style="max-height: 40px; max-width: 120px;">`
                          : ""
                      }
                    </div>
                    <p>Date: ${signatureDate}</p>
                  </div>
                `;
                })
                .join("")}
            </td>
            <td width="33%" style="vertical-align: top; padding: 0 10px;">
              <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">Party 2 (Second Party)</h3>
              <p style="text-align: center;">Defendants/Respondents</p>
              ${formData.defendants
                .map((defendant) => {
                  const signatureDate = formatDateForDisplay(
                    defendant.signatureDate
                  );
                  return `
                  <div style="margin-bottom: 30px; text-align: center;">
                    <p style="margin-bottom: 10px;"><strong>${
                      defendant.name
                    }</strong></p>
                    <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
                      ${
                        defendant.signature
                          ? `<img src="${defendant.signature}" alt="${defendant.name} Signature" style="max-height: 40px; max-width: 120px;">`
                          : ""
                      }
                    </div>
                    <p>Date: ${signatureDate}</p>
                  </div>
                `;
                })
                .join("")}
            </td>
            <td width="33%" style="vertical-align: top; padding-left: 10px;">
              <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">On behalf of JustiFi (Witness & Record Keeper)</h3>
              <p style="text-align: center;">Name: ${formData.justifiName}</p>
              <p style="text-align: center;">Designation: ${
                formData.justifiDesignation
              }</p>
              <div style="margin-bottom: 30px; text-align: center;">
                <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
                  ${
                    formData.justifiSignature
                      ? `<img src="${formData.justifiSignature}" alt="JustiFi Signature" style="max-height: 40px; max-width: 120px;">`
                      : ""
                  }
                </div>
                <p>Date: ${agreementDateDisplay}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
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
        onclone: function (clonedDoc) {
          const images = clonedDoc.querySelectorAll("img");
          images.forEach((img) => {
            if (img.complete) {
              return;
            }
            img.onload = function () {
              // Image loaded, continue with PDF generation
            };
          });
        },
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

      pdf.save("arbitration-agreement.pdf");
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
      <div className="flex justify-between items-center mb-4 no-print">
        <h2 className="text-2xl font-bold">Generated Arbitration Agreement</h2>
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
        id="agreement-output"
        className="agreement-output border border-gray-200 rounded-md p-6 bg-gray-50"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">⚖️ ARBITRATION AGREEMENT</h1>
          <p className="text-lg">
            <strong>Date:</strong> {agreementDateDisplay}
          </p>
        </div>

        {/* Add the complete agreement content here */}
        {/* This would include all the sections from the HTML version */}
        {/* WHEREAS, Articles 1-10, Execution & Signatures, etc. */}
      </div>

      <div className="mt-4 flex justify-center no-print">
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

export default ArbAgreementPreview;
