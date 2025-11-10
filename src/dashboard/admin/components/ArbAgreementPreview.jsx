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

        const agreementDateDisplay = formatDateForDisplay(
            formData.agreementDate
        );

        // Create PDF content
        const pdfContent = `
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 24pt; font-weight: bold; margin-bottom: 10px;">⚖️ ARBITRATION AGREEMENT</h1>
        <p style="font-size: 14pt;"><strong>Date:</strong> ${agreementDateDisplay}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">THIS ARBITRATION AGREEMENT</h2>
        <p style="margin-bottom: 20px;">(Hereinafter referred to as the "Agreement") is made and entered into by and between:</p>
        
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
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">1. Arbitration Reference</h2>
        <p style="margin-bottom: 10px;">1.1 The Parties voluntarily and irrevocably agree to submit the Dispute to arbitration in accordance with the provisions of the <strong>Arbitration Act, 2001 (Bangladesh)</strong>.</p>
        <p style="margin-bottom: 10px;">1.2 The arbitration proceedings shall be conducted primarily through <strong>Online Dispute Resolution (ODR)</strong> using the <strong>JustiFi Platform</strong>.</p>
        <p style="margin-bottom: 10px;">1.3 In exceptional cases, where physical/offline hearings are deemed necessary, the <strong>Arbitrator(s)</strong> may order the same. All associated costs shall be borne <strong>equally (50%-50%)</strong> by both Parties.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">2. Constitution of the Arbitral Tribunal</h2>
        <p style="margin-bottom: 10px;">2.1 <strong>Number of Arbitrators:</strong> Three (3)</p>
        <ul style="padding-left: 20px; margin-bottom: 10px;">
          <li style="margin-bottom: 5px;"><strong>Arbitrator 1:</strong> ${
              formData.arbitrator1
          }</li>
          <li style="margin-bottom: 5px;"><strong>Arbitrator 2:</strong> ${
              formData.arbitrator2
          }</li>
          <li style="margin-bottom: 5px;"><strong>Arbitrator 3 (Presiding Arbitrator):</strong> ${
              formData.presidingArbitrator
          }</li>
        </ul>
        <p style="margin-bottom: 10px;">2.2 The Arbitrators shall be <strong>neutral and independent</strong>, in accordance with <strong>Section 12 of the Arbitration Act, 2001</strong>, and their decision shall be <strong>final and binding</strong> upon the Parties.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">3. Seat, Venue & Language</h2>
        <p style="margin-bottom: 10px;">3.1 <strong>Seat of Arbitration:</strong> Dhaka, Bangladesh (unless otherwise mutually agreed).</p>
        <p style="margin-bottom: 10px;">3.2 <strong>Mode:</strong> Online (virtual hearings) via the <strong>JustiFi ODR System</strong>.</p>
        <p style="margin-bottom: 10px;">3.3 <strong>Language:</strong> English and/or Bangla, as agreed between the Parties.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">4. Suit Value, Costs & Fees</h2>
        <p style="margin-bottom: 10px;">4.1 <strong>Suit Value (Dispute Amount):</strong> BDT ${
            formData.suitValue
        }</p>
        <p style="margin-bottom: 10px;">4.2 <strong>Number of Sittings (Initially Agreed):</strong> ${
            formData.sittings
        }</p>
        <p style="margin-bottom: 10px;">4.3 <strong>Total Arbitration Cost (Administrative + Arbitrator Fees):</strong> BDT ${
            formData.totalCost
        }</p>
        <p style="margin-bottom: 10px;">4.4 All costs of arbitration shall be shared <strong>equally</strong> between the Parties.</p>
        <p style="margin-bottom: 10px;">4.5 If additional sittings are deemed necessary for fair adjudication, the Arbitrator(s) may extend proceedings, and any additional costs shall also be borne equally by both Parties.</p>
        <p style="margin-bottom: 10px;">4.6 Each Party shall individually bear the cost of its own <strong>lawyers, representatives, advisors, or personal expenses</strong>.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">5. Premature Termination / Withdrawal</h2>
        <p style="margin-bottom: 10px;">5.1 Should either Party withdraw or terminate participation before conclusion:</p>
        <ul style="padding-left: 20px; margin-bottom: 10px;">
          <li style="margin-bottom: 5px;">That Party must pay all costs incurred up to the date of termination; and</li>
          <li style="margin-bottom: 5px;">An additional <strong>lump-sum penalty</strong> as determined by the Arbitrator(s) or JustiFi to cover administrative expenses.</li>
        </ul>
        <p style="margin-bottom: 10px;">5.2 The arbitration may continue <strong>ex parte</strong> if one Party fails to participate, at the discretion of the Arbitrator(s).</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">6. Conduct & Confidentiality</h2>
        <p style="margin-bottom: 10px;">6.1 Both Parties shall maintain professional conduct and respect toward the Arbitrator(s) and the <strong>JustiFi platform</strong>.</p>
        <p style="margin-bottom: 10px;">6.2 Any form of abuse, misconduct, or defamatory act towards the Tribunal or platform shall constitute a <strong>breach of this Agreement</strong>.</p>
        <p style="margin-bottom: 10px;">6.3 All proceedings, documents, evidence, and awards shall remain <strong>strictly confidential</strong>.</p>
        <p style="margin-bottom: 10px;">6.4 No Party shall disclose or publish any part of the arbitration process unless required by law or upon written consent of the other Party.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">7. Powers & Duties of Arbitrators</h2>
        <p style="margin-bottom: 10px;">The Arbitrator(s) shall have the power to:</p>
        <ul style="padding-left: 20px; margin-bottom: 10px;">
          <li style="margin-bottom: 5px;">Decide all procedural and evidentiary matters;</li>
          <li style="margin-bottom: 5px;">Request additional hearings, documents, or witnesses;</li>
          <li style="margin-bottom: 5px;">Extend the number of sittings as necessary;</li>
          <li style="margin-bottom: 5px;">Prohibit any unilateral or ex parte communications;</li>
          <li style="margin-bottom: 5px;">Interpret contractual obligations to reach a fair and lawful resolution.</li>
        </ul>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">8. Applicable Law & Jurisdiction</h2>
        <p style="margin-bottom: 10px;">This Agreement and all arbitration proceedings shall be governed by:</p>
        <ul style="padding-left: 20px; margin-bottom: 10px;">
          <li style="margin-bottom: 5px;">The <strong>Arbitration Act, 2001 (Bangladesh)</strong>; and</li>
          <li style="margin-bottom: 5px;">The <strong>laws of the People's Republic of Bangladesh</strong>.</li>
        </ul>
        <p style="margin-bottom: 10px;">Courts situated in <strong>Dhaka, Bangladesh</strong> shall have <strong>exclusive jurisdiction</strong> for enforcement, setting aside, or any judicial assistance concerning the arbitral award.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">9. Binding Nature of Award</h2>
        <p style="margin-bottom: 10px;">The Award rendered by the Arbitral Tribunal shall be:</p>
        <ul style="padding-left: 20px; margin-bottom: 10px;">
          <li style="margin-bottom: 5px;"><strong>Final and binding</strong> upon both Parties, under <strong>Section 44 of the Arbitration Act, 2001</strong>;</li>
          <li style="margin-bottom: 5px;"><strong>Enforceable as a decree or court order</strong> within Bangladesh; and</li>
          <li style="margin-bottom: 5px;">Obligatory to be complied with within <strong>${
              formData.complianceDays
          } days</strong> from the date of issuance.</li>
        </ul>
      </div>
      
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
      
      <div style="margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">⚖️ Legal References Incorporated</h2>
        <table width="100%" style="border-collapse: collapse; border: 1px solid #ccc;">
          <thead style="background-color: #f8f9fa;">
            <tr>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Clause</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Reference</th>
              <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">1, 2, 8, 9</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Arbitration Act, 2001 (Bangladesh)</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Legal foundation for arbitration procedure, award, and enforcement</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">2.2</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Section 12, Arbitration Act 2001</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Independence and neutrality of arbitrators</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">9</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Section 44, Arbitration Act 2001</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Binding nature and enforcement of award</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">8</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Civil Procedure Code (CPC), Bangladesh</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Court jurisdiction for award enforcement</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">General</td>
              <td style="border: 1px solid #ccc; padding: 8px;">JustiFi ODR Rules</td>
              <td style="border: 1px solid #ccc; padding: 8px;">Platform's procedural framework</td>
            </tr>
          </tbody>
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
                <h2 className="text-2xl font-bold">
                    Generated Arbitration Agreement
                </h2>
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
                    <h1 className="text-2xl font-bold mb-2">
                        ⚖️ ARBITRATION AGREEMENT
                    </h1>
                    <p className="text-lg">
                        <strong>Date:</strong> {agreementDateDisplay}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        THIS ARBITRATION AGREEMENT
                    </h2>
                    <p className="mb-4">
                        (Here in after referred to as the "Agreement") is made
                        and entered into by and between:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="border border-gray-300 p-4 rounded">
                            <h3 className="font-bold mb-2 text-blue-600">
                                Party 1 – Claimant(s)/Plaintiff(s)
                            </h3>
                            {formData.plaintiffs.map((plaintiff, index) => (
                                <div key={index} className="mb-4">
                                    <p>
                                        <strong>Name:</strong> {plaintiff.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {plaintiff.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {plaintiff.phone}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{" "}
                                        {plaintiff.address}
                                    </p>
                                    <p>
                                        <strong>Occupation:</strong>{" "}
                                        {plaintiff.occupation}
                                    </p>
                                    {index < formData.plaintiffs.length - 1 && (
                                        <hr className="my-4" />
                                    )}
                                </div>
                            ))}
                            <p className="mt-4">
                                (Hereinafter referred to as the{" "}
                                <strong>First Party</strong>)
                            </p>
                        </div>

                        <div className="border border-gray-300 p-4 rounded">
                            <h3 className="font-bold mb-2 text-red-600">
                                Party 2 – Respondent(s)/Defendant(s)
                            </h3>
                            {formData.defendants.map((defendant, index) => (
                                <div key={index} className="mb-4">
                                    <p>
                                        <strong>Name:</strong> {defendant.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {defendant.email}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {defendant.phone}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{" "}
                                        {defendant.address}
                                    </p>
                                    <p>
                                        <strong>Occupation:</strong>{" "}
                                        {defendant.occupation}
                                    </p>
                                    {index < formData.defendants.length - 1 && (
                                        <hr className="my-4" />
                                    )}
                                </div>
                            ))}
                            <p className="mt-4">
                                (Hereinafter referred to as the{" "}
                                <strong>Second Party</strong>)
                            </p>
                        </div>
                    </div>

                    <p>
                        Collectively referred to as the <strong>Parties</strong>
                        , and individually as a <strong>Party</strong>.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        WHEREAS:
                    </h2>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>
                            The Parties are involved in a legal dispute arising
                            out of {formData.disputeNature} ("Dispute");
                        </li>
                        <li>
                            The Parties have mutually agreed to refer the said
                            Dispute to <strong>arbitration</strong>, to be
                            conducted through the{" "}
                            <strong>
                                JustiFi – Online Legal Aid & Arbitration
                                Platform
                            </strong>
                            , under its established rules and procedures;
                        </li>
                        <li>
                            The Parties desire to record their mutual
                            understanding and agreement to the terms,
                            conditions, and procedures governing such
                            arbitration.
                        </li>
                    </ol>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        1. Arbitration Reference
                    </h2>
                    <p className="mb-2">
                        1.1 The Parties voluntarily and irrevocably agree to
                        submit the Dispute to arbitration in accordance with the
                        provisions of the{" "}
                        <strong>Arbitration Act, 2001 (Bangladesh)</strong>.
                    </p>
                    <p className="mb-2">
                        1.2 The arbitration proceedings shall be conducted
                        primarily through{" "}
                        <strong>Online Dispute Resolution (ODR)</strong> using
                        the <strong>JustiFi Platform</strong>.
                    </p>
                    <p className="mb-2">
                        1.3 In exceptional cases, where physical/offline
                        hearings are deemed necessary, the{" "}
                        <strong>Arbitrator(s)</strong> may order the same. All
                        associated costs shall be borne{" "}
                        <strong>equally (50%-50%)</strong> by both Parties.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        2. Constitution of the Arbitral Tribunal
                    </h2>
                    <p className="mb-2">
                        2.1 <strong>Number of Arbitrators:</strong> Three (3)
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>
                            <strong>Arbitrator 1:</strong>{" "}
                            {formData.arbitrator1}
                        </li>
                        <li>
                            <strong>Arbitrator 2:</strong>{" "}
                            {formData.arbitrator2}
                        </li>
                        <li>
                            <strong>
                                Arbitrator 3 (Presiding Arbitrator):
                            </strong>{" "}
                            {formData.presidingArbitrator}
                        </li>
                    </ul>
                    <p className="mt-2">
                        2.2 The Arbitrators shall be{" "}
                        <strong>neutral and independent</strong>, in accordance
                        with{" "}
                        <strong>Section 12 of the Arbitration Act, 2001</strong>
                        , and their decision shall be{" "}
                        <strong>final and binding</strong> upon the Parties.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        3. Seat, Venue & Language
                    </h2>
                    <p className="mb-2">
                        3.1 <strong>Seat of Arbitration:</strong> Dhaka,
                        Bangladesh (unless otherwise mutually agreed).
                    </p>
                    <p className="mb-2">
                        3.2 <strong>Mode:</strong> Online (virtual hearings) via
                        the <strong>JustiFi ODR System</strong>.
                    </p>
                    <p className="mb-2">
                        3.3 <strong>Language:</strong> English and/or Bangla, as
                        agreed between the Parties.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        4. Suit Value, Costs & Fees
                    </h2>
                    <p className="mb-2">
                        4.1 <strong>Suit Value (Dispute Amount):</strong> BDT{" "}
                        {formData.suitValue}
                    </p>
                    <p className="mb-2">
                        4.2{" "}
                        <strong>Number of Sittings (Initially Agreed):</strong>{" "}
                        {formData.sittings}
                    </p>
                    <p className="mb-2">
                        4.3{" "}
                        <strong>
                            Total Arbitration Cost (Administrative + Arbitrator
                            Fees):
                        </strong>{" "}
                        BDT {formData.totalCost}
                    </p>
                    <p className="mb-2">
                        4.4 All costs of arbitration shall be shared{" "}
                        <strong>equally</strong> between the Parties.
                    </p>
                    <p className="mb-2">
                        4.5 If additional sittings are deemed necessary for fair
                        adjudication, the Arbitrator(s) may extend proceedings,
                        and any additional costs shall also be borne equally by
                        both Parties.
                    </p>
                    <p className="mb-2">
                        4.6 Each Party shall individually bear the cost of its
                        own{" "}
                        <strong>
                            lawyers, representatives, advisors, or personal
                            expenses
                        </strong>
                        .
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        5. Premature Termination / Withdrawal
                    </h2>
                    <p className="mb-2">
                        5.1 Should either Party withdraw or terminate
                        participation before conclusion:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>
                            That Party must pay all costs incurred up to the
                            date of termination; and
                        </li>
                        <li>
                            An additional <strong>lump-sum penalty</strong> as
                            determined by the Arbitrator(s) or JustiFi to cover
                            administrative expenses.
                        </li>
                    </ul>
                    <p className="mt-2">
                        5.2 The arbitration may continue{" "}
                        <strong>ex parte</strong> if one Party fails to
                        participate, at the discretion of the Arbitrator(s).
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        6. Conduct & Confidentiality
                    </h2>
                    <p className="mb-2">
                        6.1 Both Parties shall maintain professional conduct and
                        respect toward the Arbitrator(s) and the{" "}
                        <strong>JustiFi platform</strong>.
                    </p>
                    <p className="mb-2">
                        6.2 Any form of abuse, misconduct, or defamatory act
                        towards the Tribunal or platform shall constitute a{" "}
                        <strong>breach of this Agreement</strong>.
                    </p>
                    <p className="mb-2">
                        6.3 All proceedings, documents, evidence, and awards
                        shall remain <strong>strictly confidential</strong>.
                    </p>
                    <p className="mb-2">
                        6.4 No Party shall disclose or publish any part of the
                        arbitration process unless required by law or upon
                        written consent of the other Party.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        7. Powers & Duties of Arbitrators
                    </h2>
                    <p className="mb-2">
                        The Arbitrator(s) shall have the power to:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Decide all procedural and evidentiary matters;</li>
                        <li>
                            Request additional hearings, documents, or
                            witnesses;
                        </li>
                        <li>Extend the number of sittings as necessary;</li>
                        <li>
                            Prohibit any unilateral or ex parte communications;
                        </li>
                        <li>
                            Interpret contractual obligations to reach a fair
                            and lawful resolution.
                        </li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        8. Applicable Law & Jurisdiction
                    </h2>
                    <p className="mb-2">
                        This Agreement and all arbitration proceedings shall be
                        governed by:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>
                            The{" "}
                            <strong>Arbitration Act, 2001 (Bangladesh)</strong>;
                            and
                        </li>
                        <li>
                            The{" "}
                            <strong>
                                laws of the People's Republic of Bangladesh
                            </strong>
                            .
                        </li>
                    </ul>
                    <p className="mt-2">
                        Courts situated in <strong>Dhaka, Bangladesh</strong>{" "}
                        shall have <strong>exclusive jurisdiction</strong> for
                        enforcement, setting aside, or any judicial assistance
                        concerning the arbitral award.
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        9. Binding Nature of Award
                    </h2>
                    <p className="mb-2">
                        The Award rendered by the Arbitral Tribunal shall be:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>
                            <strong>Final and binding</strong> upon both
                            Parties, under{" "}
                            <strong>
                                Section 44 of the Arbitration Act, 2001
                            </strong>
                            ;
                        </li>
                        <li>
                            <strong>
                                Enforceable as a decree or court order
                            </strong>{" "}
                            within Bangladesh; and
                        </li>
                        <li>
                            Obligatory to be complied with within{" "}
                            <strong>{formData.complianceDays} days</strong> from
                            the date of issuance.
                        </li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        10. Execution & Signatures
                    </h2>
                    <p className="mb-4">
                        <strong>IN WITNESS WHEREOF</strong>, the Parties have
                        executed this Arbitration Agreement on the date first
                        written above.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="text-center border-t border-gray-300 pt-4">
                            <p className="font-bold">Party 1 (First Party)</p>
                            <p className="mt-4">Plaintiffs/Claimants</p>
                            <div className="mt-4">
                                {formData.plaintiffs.map((plaintiff, index) => {
                                    const signatureDate = formatDateForDisplay(
                                        plaintiff.signatureDate
                                    );
                                    return (
                                        <div
                                            key={index}
                                            className="mb-4 text-center"
                                        >
                                            <p className="font-medium mb-2">
                                                {plaintiff.name}
                                            </p>
                                            <div className="signature-slot border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                                                {plaintiff.signature && (
                                                    <img
                                                        src={
                                                            plaintiff.signature
                                                        }
                                                        className="signature-preview h-12"
                                                        alt={`${plaintiff.name} Signature`}
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-1">
                                                Date: {signatureDate}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-center border-t border-gray-300 pt-4">
                            <p className="font-bold">Party 2 (Second Party)</p>
                            <p className="mt-4">Defendants/Respondents</p>
                            <div className="mt-4">
                                {formData.defendants.map((defendant, index) => {
                                    const signatureDate = formatDateForDisplay(
                                        defendant.signatureDate
                                    );
                                    return (
                                        <div
                                            key={index}
                                            className="mb-4 text-center"
                                        >
                                            <p className="font-medium mb-2">
                                                {defendant.name}
                                            </p>
                                            <div className="signature-slot border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                                                {defendant.signature && (
                                                    <img
                                                        src={
                                                            defendant.signature
                                                        }
                                                        className="signature-preview h-12"
                                                        alt={`${defendant.name} Signature`}
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-1">
                                                Date: {signatureDate}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-center border-t border-gray-300 pt-4">
                            <p className="font-bold">
                                On behalf of JustiFi (Witness & Record Keeper)
                            </p>
                            <p className="mt-4">Name: {formData.justifiName}</p>
                            <p>Designation: {formData.justifiDesignation}</p>
                            <div className="mt-4">
                                <div className="signature-slot border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                                    {formData.justifiSignature && (
                                        <img
                                            src={formData.justifiSignature}
                                            className="signature-preview h-12"
                                            alt="JustiFi Signature"
                                        />
                                    )}
                                </div>
                                <p className="mt-1">
                                    Date: {agreementDateDisplay}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">
                        ⚖️ Legal References Incorporated
                    </h2>
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 p-2 text-left">
                                    Clause
                                </th>
                                <th className="border border-gray-300 p-2 text-left">
                                    Reference
                                </th>
                                <th className="border border-gray-300 p-2 text-left">
                                    Purpose
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    1, 2, 8, 9
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Arbitration Act, 2001 (Bangladesh)
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Legal foundation for arbitration procedure,
                                    award, and enforcement
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    2.2
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Section 12, Arbitration Act 2001
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Independence and neutrality of arbitrators
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    9
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Section 44, Arbitration Act 2001
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Binding nature and enforcement of award
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    8
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Civil Procedure Code (CPC), Bangladesh
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Court jurisdiction for award enforcement
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    General
                                </td>
                                <td className="border border-gray-300 p-2">
                                    JustiFi ODR Rules
                                </td>
                                <td className="border border-gray-300 p-2">
                                    Platform's procedural framework
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 mb-6 text-center text-sm text-gray-600 border-t pt-4">
                <p>
                    <strong>
                        JustiFi - Fair Dispute Resolution Through Equal
                        Partnership
                    </strong>
                </p>
                <p className="mt-2">
                    This document constitutes a legally binding agreement
                    between all signing parties.
                </p>
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
