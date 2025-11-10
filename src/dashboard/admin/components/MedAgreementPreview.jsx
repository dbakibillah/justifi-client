import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useEffect } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

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

        const agreementDateDisplay = formatDateForDisplay(
            formData.agreementDate
        );

        // Create parties list for PDF with side-by-side layout
        let partiesPDF = `
      <table width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td width="50%" style="vertical-align: top; padding-right: 15px;">
            <h3 style="font-weight: bold; margin-bottom: 10px; color: #2563eb;">PLAINTIFFS</h3>
    `;

        // Plaintiffs
        formData.plaintiffs.forEach((plaintiff, index) => {
            partiesPDF += `
        <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
          <p style="font-weight: bold;">Plaintiff ${index + 1}</p>
          <p><strong>Name:</strong> ${plaintiff.name}</p>
          <p><strong>Parents:</strong> ${plaintiff.parents}</p>
          <p><strong>Email:</strong> ${plaintiff.email}</p>
          <p><strong>Phone:</strong> ${plaintiff.phone}</p>
          <p><strong>Address:</strong> ${plaintiff.address}</p>
          <p><strong>Occupation:</strong> ${plaintiff.occupation}</p>
        </div>
      `;
        });

        partiesPDF += `
          </td>
          <td width="50%" style="vertical-align: top; padding-left: 15px;">
            <h3 style="font-weight: bold; margin-bottom: 10px; color: #dc2626;">DEFENDANTS</h3>
    `;

        // Defendants
        formData.defendants.forEach((defendant, index) => {
            partiesPDF += `
        <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc;">
          <p style="font-weight: bold;">Defendant ${index + 1}</p>
          <p><strong>Name:</strong> ${defendant.name}</p>
          <p><strong>Parents:</strong> ${defendant.parents}</p>
          <p><strong>Email:</strong> ${defendant.email}</p>
          <p><strong>Phone:</strong> ${defendant.phone}</p>
          <p><strong>Address:</strong> ${defendant.address}</p>
          <p><strong>Occupation:</strong> ${defendant.occupation}</p>
        </div>
      `;
        });

        partiesPDF += `
          </td>
        </tr>
      </table>
    `;

        // Create PDF content
        const pdfContent = `
      <div style="text-align: center; border-bottom: 2px solid #1e40af; padding-bottom: 20px; margin-bottom: 40px;">
        <h1 style="font-size: 24pt; font-weight: bold; margin-bottom: 10px;">JustiFi - Mediation Agreement</h1>
        <p style="font-size: 14pt;"><strong>Date:</strong> ${agreementDateDisplay}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">THIS MEDIATION AGREEMENT</h2>
        <p style="text-align: justify; margin-bottom: 20px;">(Hereinafter referred to as the "Agreement") is made and entered into by and between the following parties:</p>
        
        ${partiesPDF}
        
        <p style="text-align: justify;">Collectively referred to as the <strong>Parties</strong>, and individually as a <strong>Party</strong>.</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">WHEREAS:</h2>
        <ol style="text-align: justify; padding-left: 20px;">
          <li style="margin-bottom: 10px;">The Parties are involved in a dispute of category <strong>${
              formData.disputeCategory
          }</strong> with suit value <strong>${
            formData.suitValue
        }</strong> arising out of: <strong>${
            formData.disputeNature
        }</strong>;</li>
          <li style="margin-bottom: 10px;">The Parties have mutually agreed to refer the said dispute to mediation through the <strong>JustiFi – Online Legal Aid & Mediation Platform</strong>;</li>
          <li style="margin-bottom: 10px;">The Parties desire to record their mutual understanding and agreement to the terms, conditions, and procedures governing such mediation.</li>
        </ol>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">ARTICLE 1: MEDIATION TERMS</h2>
        <div style="text-align: justify;">
          <p style="margin-bottom: 10px;"><strong>1.1 Mediation Process:</strong> The Parties have agreed to resolve their dispute through mediation.</p>
          <p style="margin-bottom: 10px;"><strong>1.2 Session Agreement:</strong> The Parties have agreed to <strong>${
              formData.sessionsAgreed
          } mediation session(s)</strong>.</p>
          <p style="margin-bottom: 10px;"><strong>1.3 Assigned Mediator:</strong> ${
              formData.mediatorName
          } (${
            formData.mediatorQualification
        }) has been assigned as the mediator.</p>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">ARTICLE 2: COST DISTRIBUTION</h2>
        <div style="text-align: justify;">
          <p style="margin-bottom: 10px;"><strong>2.1 Equal Cost Sharing:</strong> All mediation costs shall be divided equally among all parties.</p>
          <p style="margin-bottom: 10px;"><strong>2.2 Cost Breakdown:</strong></p>
          <ul style="padding-left: 20px; margin-bottom: 10px;">
            <li style="margin-bottom: 5px;">Total Mediation Cost: <strong>BDT ${parseFloat(
                formData.totalCost
            ).toFixed(2)}</strong></li>
            <li style="margin-bottom: 5px;">Number of Parties: <strong>${
                formData.plaintiffs.length + formData.defendants.length
            }</strong></li>
            <li style="margin-bottom: 5px;">Cost per Party: <strong>BDT ${parseFloat(
                formData.costPerParty
            ).toFixed(2)}</strong></li>
          </ul>
          <p style="margin-bottom: 10px;"><strong>2.3 Payment Responsibility:</strong> Parties are jointly and severally responsible for full payment.</p>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">ARTICLE 3: CONFIDENTIALITY</h2>
        <div style="text-align: justify;">
          <p style="margin-bottom: 10px;"><strong>3.1 Strict Confidentiality:</strong> All mediation proceedings, documents, discussions, and offers remain strictly confidential.</p>
          <p style="margin-bottom: 10px;"><strong>3.2 Legal Protection:</strong> Mediation communications are privileged and cannot be used as evidence in legal proceedings.</p>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">ARTICLE 4: PARTY RESPONSIBILITIES</h2>
        <div style="text-align: justify;">
          <p style="margin-bottom: 10px;"><strong>4.1 Financial Obligations:</strong> Each Party agrees to pay their equal share of all mediation costs according to the agreed schedule.</p>
          <p style="margin-bottom: 10px;"><strong>4.2 Participation Requirements:</strong> Each Party agrees to:</p>
          <ul style="padding-left: 20px; margin-bottom: 10px;">
            <li style="margin-bottom: 5px;">Attend all scheduled mediation sessions</li>
            <li style="margin-bottom: 5px;">Participate in good faith throughout the process</li>
            <li style="margin-bottom: 5px;">Maintain respectful and professional conduct</li>
            <li style="margin-bottom: 5px;">Respect the mediator and other parties</li>
          </ul>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">ARTICLE 5: ACKNOWLEDGMENT AND ACCEPTANCE</h2>
        <div style="text-align: justify;">
          <p style="margin-bottom: 10px;">By signing this Agreement, the Parties acknowledge and agree to:</p>
          <ul style="padding-left: 20px; margin-bottom: 10px;">
            <li style="margin-bottom: 5px;">Bear equal share of all mediation costs</li>
            <li style="margin-bottom: 5px;">Participate in good faith throughout the mediation process</li>
            <li style="margin-bottom: 5px;">Maintain strict confidentiality of all proceedings</li>
            <li style="margin-bottom: 5px;">Accept the mediation session limits (${
                formData.sessionsAgreed
            } session(s))</li>
            <li style="margin-bottom: 5px;">Be bound by the mediator's decisions and procedures</li>
          </ul>
        </div>
      </div>
      
      <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ccc;">
        <h2 style="font-size: 16pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 5px;">EXECUTION & SIGNATURES</h2>
        <p style="text-align: justify; margin-bottom: 30px;"><strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Mediation Agreement on the date first written above.</p>
        
        <table width="100%" style="border-collapse: collapse;">
          <tr>
            <td width="50%" style="vertical-align: top; padding-right: 20px;">
              <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">PLAINTIFFS</h3>
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
            <td width="50%" style="vertical-align: top; padding-left: 20px;">
              <h3 style="text-align: center; font-weight: bold; margin-bottom: 20px;">DEFENDANTS</h3>
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
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 40px;">
          <h3 style="font-weight: bold; margin-bottom: 20px;">ON BEHALF OF JUSTIFI</h3>
          <div style="text-align: center; margin-bottom: 30px;">
            <p><strong>Name:</strong> ${formData.justifiName}</p>
            <p><strong>Designation:</strong> ${formData.justifiDesignation}</p>
          </div>
          <div style="border-bottom: 1px solid #000; height: 50px; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
            ${
                formData.justifiSignature
                    ? `<img src="${formData.justifiSignature}" alt="JustiFi Signature" style="max-height: 40px; max-width: 120px;">`
                    : ""
            }
          </div>
          <p style="text-align: center;">Date: ${agreementDateDisplay}</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px;">
        <p><strong>JustiFi - Fair Dispute Resolution Through Equal Partnership</strong></p>
        <p style="margin-top: 10px;">This document constitutes a legally binding agreement between all signing parties.</p>
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
                <h2 className="text-2xl font-bold">
                    Generated Mediation Agreement
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
                id="agreement-preview"
                className="font-['Times_New_Roman',Times,serif] leading-relaxed text-sm bg-white p-8 border border-gray-300 rounded-lg"
            >
                <div className="text-center border-b-2 border-blue-800 pb-4 mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                        JustiFi - Mediation Agreement
                    </h1>
                    <p className="text-lg">
                        <strong>Date:</strong> {agreementDateDisplay}
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        THIS MEDIATION AGREEMENT
                    </h2>
                    <p className="mb-4 text-justify">
                        (Here in after referred to as the "Agreement") is made
                        and entered into by and between the following parties:
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
                                    <p className="font-semibold">
                                        Plaintiff {index + 1}
                                    </p>
                                    <p>
                                        <strong>Name:</strong> {plaintiff.name}
                                    </p>
                                    <p>
                                        <strong>Parents:</strong>{" "}
                                        {plaintiff.parents}
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
                                    <p className="font-semibold">
                                        Defendant {index + 1}
                                    </p>
                                    <p>
                                        <strong>Name:</strong> {defendant.name}
                                    </p>
                                    <p>
                                        <strong>Parents:</strong>{" "}
                                        {defendant.parents}
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
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-justify">
                        Collectively referred to as the <strong>Parties</strong>
                        , and individually as a <strong>Party</strong>.
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        WHEREAS:
                    </h2>
                    <ol className="list-decimal pl-6 space-y-3">
                        <li className="text-justify">
                            The Parties are involved in a dispute of category{" "}
                            <strong>{formData.disputeCategory}</strong> with
                            suit value <strong>{formData.suitValue}</strong>{" "}
                            arising out of:{" "}
                            <strong>{formData.disputeNature}</strong>;
                        </li>
                        <li className="text-justify">
                            The Parties have mutually agreed to refer the said
                            dispute to mediation through the{" "}
                            <strong>
                                JustiFi – Online Legal Aid & Mediation Platform
                            </strong>
                            ;
                        </li>
                        <li className="text-justify">
                            The Parties desire to record their mutual
                            understanding and agreement to the terms,
                            conditions, and procedures governing such mediation.
                        </li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        ARTICLE 1: MEDIATION TERMS
                    </h2>
                    <div className="text-justify">
                        <p className="mb-2">
                            <strong>1.1 Mediation Process:</strong> The Parties
                            have agreed to resolve their dispute through
                            mediation.
                        </p>
                        <p className="mb-2">
                            <strong>1.2 Session Agreement:</strong> The Parties
                            have agreed to{" "}
                            <strong>
                                {formData.sessionsAgreed} mediation session(s)
                            </strong>
                            .
                        </p>
                        <p className="mb-2">
                            <strong>1.3 Assigned Mediator:</strong>{" "}
                            {formData.mediatorName} (
                            {formData.mediatorQualification}) has been assigned
                            as the mediator.
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        ARTICLE 2: COST DISTRIBUTION
                    </h2>
                    <div className="text-justify">
                        <p className="mb-2">
                            <strong>2.1 Equal Cost Sharing:</strong> All
                            mediation costs shall be divided equally among all
                            parties.
                        </p>
                        <p className="mb-2">
                            <strong>2.2 Cost Breakdown:</strong>
                        </p>
                        <ul className="list-disc pl-6 mt-2 mb-3">
                            <li>
                                Total Mediation Cost:{" "}
                                <strong>
                                    BDT{" "}
                                    {parseFloat(formData.totalCost).toFixed(2)}
                                </strong>
                            </li>
                            <li>
                                Number of Parties:{" "}
                                <strong>
                                    {formData.plaintiffs.length +
                                        formData.defendants.length}
                                </strong>
                            </li>
                            <li>
                                Cost per Party:{" "}
                                <strong>
                                    BDT{" "}
                                    {parseFloat(formData.costPerParty).toFixed(
                                        2
                                    )}
                                </strong>
                            </li>
                        </ul>
                        <p className="mt-3">
                            <strong>2.3 Payment Responsibility:</strong> Parties
                            are jointly and severally responsible for full
                            payment.
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        ARTICLE 3: CONFIDENTIALITY
                    </h2>
                    <div className="text-justify">
                        <p className="mb-2">
                            <strong>3.1 Strict Confidentiality:</strong> All
                            mediation proceedings, documents, discussions, and
                            offers remain strictly confidential.
                        </p>
                        <p className="mb-2">
                            <strong>3.2 Legal Protection:</strong> Mediation
                            communications are privileged and cannot be used as
                            evidence in legal proceedings.
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        ARTICLE 4: PARTY RESPONSIBILITIES
                    </h2>
                    <div className="text-justify">
                        <p className="mb-2">
                            <strong>4.1 Financial Obligations:</strong> Each
                            Party agrees to pay their equal share of all
                            mediation costs according to the agreed schedule.
                        </p>
                        <p className="mb-2">
                            <strong>4.2 Participation Requirements:</strong>{" "}
                            Each Party agrees to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 mb-3">
                            <li>Attend all scheduled mediation sessions</li>
                            <li>
                                Participate in good faith throughout the process
                            </li>
                            <li>
                                Maintain respectful and professional conduct
                            </li>
                            <li>Respect the mediator and other parties</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        ARTICLE 5: ACKNOWLEDGMENT AND ACCEPTANCE
                    </h2>
                    <div className="text-justify">
                        <p className="mb-2">
                            By signing this Agreement, the Parties acknowledge
                            and agree to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 mb-3">
                            <li>Bear equal share of all mediation costs</li>
                            <li>
                                Participate in good faith throughout the
                                mediation process
                            </li>
                            <li>
                                Maintain strict confidentiality of all
                                proceedings
                            </li>
                            <li>
                                Accept the mediation session limits (
                                {formData.sessionsAgreed} session(s))
                            </li>
                            <li>
                                Be bound by the mediator's decisions and
                                procedures
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-300">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        EXECUTION & SIGNATURES
                    </h2>
                    <p className="text-justify mb-6">
                        <strong>IN WITNESS WHEREOF</strong>, the Parties have
                        executed this Mediation Agreement on the date first
                        written above.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-4">
                                PLAINTIFFS
                            </h3>
                            {formData.plaintiffs.map((plaintiff, index) => {
                                const signatureDate = formatDateForDisplay(
                                    plaintiff.signatureDate
                                );
                                return (
                                    <div key={index} className="mb-6">
                                        <p className="font-medium mb-2">
                                            {plaintiff.name}
                                        </p>
                                        <div className="border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                                            {plaintiff.signature && (
                                                <img
                                                    src={plaintiff.signature}
                                                    style={{
                                                        maxHeight: "60px",
                                                        maxWidth: "180px",
                                                    }}
                                                    alt={`${plaintiff.name} Signature`}
                                                />
                                            )}
                                        </div>
                                        <p className="mt-2">
                                            Date: {signatureDate}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="text-center">
                            <h3 className="font-bold text-lg mb-4">
                                DEFENDANTS
                            </h3>
                            {formData.defendants.map((defendant, index) => {
                                const signatureDate = formatDateForDisplay(
                                    defendant.signatureDate
                                );
                                return (
                                    <div key={index} className="mb-6">
                                        <p className="font-medium mb-2">
                                            {defendant.name}
                                        </p>
                                        <div className="border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                                            {defendant.signature && (
                                                <img
                                                    src={defendant.signature}
                                                    style={{
                                                        maxHeight: "60px",
                                                        maxWidth: "180px",
                                                    }}
                                                    alt={`${defendant.name} Signature`}
                                                />
                                            )}
                                        </div>
                                        <p className="mt-2">
                                            Date: {signatureDate}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="font-bold text-lg mb-4">
                            ON BEHALF OF JUSTIFI
                        </h3>
                        <div className="mb-6">
                            <p className="font-medium">
                                Name: {formData.justifiName}
                            </p>
                            <p className="font-medium">
                                Designation: {formData.justifiDesignation}
                            </p>
                        </div>
                        <div className="border-b border-black min-h-[60px] mt-2 flex items-center justify-center">
                            {formData.justifiSignature && (
                                <img
                                    src={formData.justifiSignature}
                                    style={{
                                        maxHeight: "60px",
                                        maxWidth: "180px",
                                    }}
                                    alt="JustiFi Signature"
                                />
                            )}
                        </div>
                        <p className="mt-2">Date: {agreementDateDisplay}</p>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-600 border-t pt-4">
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
