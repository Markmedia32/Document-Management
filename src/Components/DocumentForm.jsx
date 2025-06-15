import React, { useEffect, useState } from "react";

import "/src/index.css";

function DocumentForm() {
  // form state
  const [formData, setFormData] = useState({ 
    ownerName: "", 
    phone: "", 
    idNumber: "", 
    service: "", 
    serviceType: "", 
    comments: "" 
  });


  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("submissions");

    return saved ? JSON.parse(saved) : [];
  });

   const [searchTerm, setSearchTerm] = useState('');
   const [searchQuery, setSearchQuery] = useState('');

   
   // Filter submissions by search term
  const filteredSubmissions = submissions.filter((item) =>
    item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  useEffect(() => {
  if (searchTerm.trim() === '') {
    setSearchQuery('');
  }
}, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);


  const [selectedClient, setSelectedClient] = useState(null);
  const [expandedClientId, setExpandedClientId] = useState(null);



  // services with their document checklists
  const services = {
    dlRecordUpdates: {
      label: "DL Record Updates",
      types: {
        updateRecord: {
          label: "Record Update",
          checklist: [
            "Fill form.",
            "Provide proof of identification.",
            "Other related documents."
          ],
        },
      },
    },
    forcedTransfer: {
      label: "Forced Transfer",
      types: {
        bankRepossession: {
          label: "Bank Repossession Auction",
          checklist: [
            "Certfied Copy of Valid Auctioneer License",
            "Auctioneer registration certificate and PIN for auctioned vehicles.",
            "Tender documents for tendered motor vehicle.",
            "A letter of instruction issued by financial institution appointing the auctioneer.",
            "Certificate of sale.",
            "Original Purchase receipt.",
            "Certficate of incorporation for the bank and auctioneer.",
            "KRA pin for Auctioneer and bank.",
            "Letter from the bank showing the highest bidder.",
            "Sworn affidavit for the applicant.",
            "Tape lift from DCI.",
            "Transfer form (Form C).",
            "Newspaper Advert."
          ],
        },
        policeAuctions: {
          label: "Police/Uncollected Property Auctions",
          checklist: [
            "A certified copy of valid Auctioneer license.",
            "Auctioneer registration certificate and pin.",
            "Certificate of sale.",
            "Original purchase receipt.",
            "Gazette notice and/or newspaper advert.",
            "Sworn affidavit for the applicant.",
            "Tape lift from DCI.",
            "Properly filled & Stamped form C by the Auctioneer.",
            "A copy of the list of the vehicles disposed from the police.",
            "Official letter for request of transfer.",
            "Court order authorizing the auction."
          ],
        },
        transferByCourtOrder: {
          label: "Transfer by Court Order",
          checklist: [
            "Sworn Affidavit for the applicant.",
            "KRA PIN and ID of new owner.",
            "Tape Lift from DCI.",
            "Transfer form (Form C).",
            "Official letter for request of transfer.",
            "Court order.",
            "Original Logbook."
          ],
        },
        successionCase: {
          label: "Succession Case",
          checklist: [
            "A certified copy of the certificate of grants and the schedule of properties.",
            "Letter appointing administrators of the estate.",
            "Original Registration Certificate (logbook) or Police Abstract.",
            "Official letter for request of transfer.",
            "Certified copy of the death certificate by CRS.",
            "Tape lift from DCI.",
            "Transfer form (Form C).",
            "Sworn Affidavit from the successor.",
            "KRA PIN and ID of new owner."
          ],
        },
        distressForRentAuction: {
          label: "Distress for Rent Auction",
          checklist: [
            "Original logbook/police abstract.",
            "Properly filled form C stamped by the auctioneer.",
            "Tape Lift from DCI.",
            "Sworn Affidavit from a magistrate/advocate.",
            "Copy of ID & KRA PIN of both new and previous owners.",
            "Certificate of registration and KRA PIN of the Company.",
            "Copy of Auctioneers license and registration certificate.",
            "Certificate of sale."
          ],
        },
        diplomatToEmbassy: {
          label: "Diplomat to Embassy",
          checklist: [
            "Request Letter (written by Embassy/mission).",
            "Form A approved by ministry.",
            "Form C approved by ministry.",
            "Customs Entry and duty payment receipt.",
            "Diplomatic ID for both buyer and seller.",
            "KRA PIN for both buyer and seller.",
            "PRO 1 B Form.",
            "Pro 1C Form.",
            "Organisation / Embassy PIN.",
            "Original Logbook."
          ],
        },
        previousVehicleOwnerMissingOrAbsent: {
          label: "Previous Vehicle Owner Missing or Absent",
          checklist: [
            "A copy of ID of incorporation of the registered and new owner.",
            "Sworn Affidavit for the applicant.",
            "Tape Lift from DCI.",
            "Seller agreement with signed Form C duly filled by the registered owner.",
            "Official letter for request of transfer.",
            "Original Logbook or Police Abstract.",
            "KRA PIN Certificate of the registered and the new owner.",
            "Court Order."
          ],
        },
      },
    },
    reRegistration: {
      label: "Re-Registration Services",
      types: {
        exGK: {
          label: "Re-Registration of EX-GK Vehicles, GK and County Governments.",
          checklist: [
            "Application Form A.",
            "GK number plate / Retention letter.",
            "GK Registration certificate.",
            "Application Form C.",
            "Valid Auctioneers License.",
            "KRA PIN and Certificate of Incorporation.",
            "Copies of KRA PIN Certificate and National ID of the buyer.",
            "Tape lift of the chassis and engine numbers from the DCI.",
            "New entry form after paying duty for those whose duty was not paid."
          ],
        },
        exDiplomatToDiplomat: {
          label: "Re-Registration of EX-Diplomat TO Diplomat Vehicles",
          checklist: [
            "Form A approved by the Ministry of Foreign Affairs.",
            "Form C approved by the Ministry of Foreign Affairs.",
            "Original Customs entry (Form C 17B).",
            "Original KRA Payment Receipt.",
            "Original Logbook.",
            "Pro 1 B.",
            "Pro 1 C.",
            "KRA PIN of the Buyer.",
            "KRA PIN of the Seller.",
            "Diplomatic ID of the Buyer.",
            "Diplomatic ID of the Seller."
          ],
        },
        exDiplomatToDiplomatMission: {
          label: "Re-Registration of Ex-Diplomat to Diplomat (Mission) Vehicles",
          checklist: [
            "Filled Form A approved by the Ministry of Foreign Affairs.",
            "Filled Form C approved by the Ministry of Foreign Affairs.",
            "Original Customs entry.",
            "Original Payment receipt.",
            "Original approved PRO 1B.",
            "Original approved PRO 1C.",
            "Original Logbook.",
            "KRA PIN of the Buyer and Seller.",
            "Valid Diplomatic ID of the Buyer and Seller.",
            "Surrender of Plates at the collection point."
          ],
        },
        exCivilianToGK: {
          label: "Re-Registration of EX-CIVILIAN TO GK",
          checklist: [
            "If the vehicle is a donation, a letter from the donor is required.",
            "Request letter on the conversion.",
            "Tape Lift of Chassis and Engine Numbers from DCI.",
            "Copies of PIN and certificate of incorporation for both organizations.",
            "Original Certificate of registration.",
            "Surrender of Plates at the Collection point."
          ],
        },
        exDiplomatsToParastatal: {
          label: "Re-Registration of EX-DIPLOMATS TO PARASTATALS/GOVERNMENT",
          checklist: [
            "Release letter from the Diplomatic organization.",
            "Acceptance letter and request for re-registration from the Parastatal/G.K.",
            "Tape Lift of Chassis and Engine Numbers from DCI.",
            "Original Logbook.",
            "Entry and payment Receipt.",
            "New entry and exemption from the National Treasury.",
            "Certificate of incorporation of the seller.",
            "KRA PIN of the buyer.",
            "Surrender of Plates at the collection point."
          ],
        },
        exCivilianToDiplomat: {
          label: "Ex-Civilian to Diplomat Re-Registration ",
          checklist: [
            "Form A approved by the Ministry of Foreign Affairs.",
            "Form C (Original customs entry Duty Paid).",
            "Original Logbook.",
            "Tape Lift of Chassis and Engine Numbers from DCI.",
            "KRA PIN of the Buyer.",
            "Diplomatic ID of the Buyer.",
            "National ID/Certificate of Incorporation (Seller).",
            "Surrender of Plates at the collection point."
          ],
        },
        civilianVehicleReRegistration: {
          label: "Civilian Vehicle Re-Registration",
          checklist: [
            "Request letter providing reasons.",
            "DCI report on the owner.",
            "Original Certificate of registration or Police Abstract.",
            "Tape Lift of Chassis and Engine Numbers from DCI.",
            "KRA PIN of the motor vehicle owner.",
            "National ID of the motor-vehicle-owner."
          ],
        },
        exCivilianToParastatal: {
          label: "Re-Registration of EX-CIVILIAN TO PARASTATAL/GOVERNMENT/COUNTY/GOVERNMENT",
          checklist: [
            "Release letter from the organization.",
            "Acceptance letter and request for re-registration form.",
            "Tape Lift of Chassis and Engine Numbers from DCI.",
            "Original Logbook.",
            "Duty paid entry.",
            "Certificate of incorporation of the seller (organization).",
            "KRA PIN of the buyer.",
            "Surrender of Plates at the collection point."
          ],
        },
        exDiplomatToCivilian: {
          label: "Ex-Diplomats to Civilian Re-Registration ",
          checklist: [
            "Form A approved by the Ministry of Foreign Affairs.",
            "Form C approved by the Ministry of Foreign Affairs.",
            "Original custom entry (Form C 17B) duty paid.",
            "Original Pro 1C/DA1.",
            "KRA Payment Receipt.",
            "Original Logbook.",
            "KRA Pin Seller.",
            "Diplomatic ID Seller.",
            "National ID/Allien Card Buyer.",
            "Surrender of Plates Letter."
          ],
        },
      },
    },
    caveat: {
      label: "Caveat Services",
      types: {
        placingCaveat: {
          label: "Placing of Caveat Service",
          checklist: [
            "Valid Court orders.",
            "Request by registered owner.",
            "Request by relevant Government Agencies (DTI, KRA, EACC).",
            "The legal spouse of the registered owner with marriage certificate.",
            "An appointed legal representative.",
            "An appointed administrator."
          ],
        },
        liftingCaveat: {
          label: "Lifting of Caveat Section",
          checklist: [
            "Application for lifting caveat.",
            "Supporting documents.",
            "Approval from concerned department."
          ],
        },
      },
    },
    addOrganization: {
      label: "Add Organization",
      types: {
        add: {
          label: "Add Organization",
          checklist: [
            "Registration certificate.",
            "Approval form.",
            "Other relevant documents."
          ],
        },
      },
    },
  };

  // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Generate a unique Serial Number
  const serialNumber = `SER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Create a new submission with Serial Number
  const newSubmission = {
    id: Date.now(), // or a GUID/UUID
    ownerName: formData.ownerName,
    phone: formData.phone,
    idNumber: formData.idNumber,
    service: formData.service,
    serviceType: formData.serviceType,
    comments: formData.comments,
    serialNumber, 
  };

  setSubmissions((prev) => [...prev, newSubmission]);

  // Reset form
  setFormData({ ownerName: "", phone: "", idNumber: "", service: "", serviceType: "", comments: '' });

  alert("Form submitted!");
};


  return (
    <div className="document-form-container">
      {/* The form itself */}
      <form className="document-form" onSubmit={handleSubmit}>
        <div className="heading">
          <h2>Document Management / Checklist</h2>
        </div>

        {/* Name */}
        <label htmlFor="ownerName">Client's Name</label>
        <input
          id="ownerName"
          name="ownerName"
          type="text"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          required
        />

        {/* Phone Number */}
        <label htmlFor="phone">Client's Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
        />

        {/* ID Number */}
        <label htmlFor="idNumber">Client's ID Number</label>
        <input
          id="idNumber"
          name="idNumber"
          type="text"
          value={formData.idNumber}
          onChange={(e) =>
            setFormData({ ...formData, idNumber: e.target.value })
          }
          required
        />

        {/* Services */}
        <label htmlFor="service">Select Service</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={(e) =>
            setFormData({ ...formData, service: e.target.value, serviceType: '' })
          }
          required
        >
          <option value="">Select a service</option>
          {Object.entries(services).map(([key, service]) => (
            <option key={key} value={key}>
              {service.label}
            </option>
          ))}
        </select>

        {/* Service Type */}
        {formData.service &&
          services[formData.service]?.types && (
            <>
              <label htmlFor="serviceType">Select Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={(e) =>
                    setFormData({ ...formData, serviceType: e.target.value })
                }
                required
              >
                <option value="">Select a Type</option>
                {Object.entries(services[formData.service].types).map(([key, type]) => (
                    <option key={key} value={key}>
                    {type.label}
                    </option>
                ))}
              </select>
            </>
          )}

        {/* Checklist */}
        {formData.service &&
          formData.serviceType &&
          services[formData.service].types[formData.serviceType]?.checklist.length > 0 && (
            <ul className="checklist">
              <h4>Please make sure you have the following documents:</h4>
              {services[formData.service].types[formData.serviceType].checklist.map((item, index) => (
                <li key={index}>
                    <input
                    id={`${formData.serviceType}_${index}`}
                    type="checkbox"
                    name={`${formData.serviceType}_${index}`}
                    />
                    <label htmlFor={`${formData.serviceType}_${index}`}>{item}</label>
                </li>
              ))}
            </ul>
          )}

        {/* Comments */}
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      

      {/* Submissions table */}
      <h2 className="client-table">Client Submissions</h2>

      {/* ADDING SEARCH HERE */}
      <div className="search-container">
      <input
        type="text"
        placeholder="Search by Client Name, Serial Number or ID Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === "Enter") {
            setSearchQuery(searchTerm.trim());
          }
        }}
        className="search-input"
      />
      </div>

      <table className="submissions-table">
  <thead>
    <tr>
        <th>Serial Number</th>
        <th>Client Name</th>
        <th>ID Number</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredSubmissions.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          {/* Summary row */}
          <td>{item.serialNumber}</td>
          <td>{item.ownerName}</td>
          <td>{item.idNumber}</td>
          <td>

            <button onClick={() => setExpandedClientId(item.id)}>View </button>
            <button onClick={() => handleStatusTracking(item.id)}>Document Stage</button>
          </td>
        </tr>

        {/* Display details directly under the row if it's selected */}
        {expandedClientId === item.id && (
          <tr className="client-details-row">
            <td colSpan="3">
              <div className="client-details">
                <h3>Client Details</h3>
                <p><strong>Serial Number:</strong>{item.serialNumber}</p>
                <p><strong>Name:</strong> {item.ownerName}</p>
                <p><strong>ID Number:</strong> {item.idNumber}</p>
                <p><strong>Phone Number:</strong> {item.phone}</p>
                <p><strong>Service:</strong> {item.service}</p>
                <p><strong>Service Type:</strong> {item.serviceType}</p>
                <p><strong>Comments:</strong> {item.comments}</p>
                <p><strong>Serial Number:</strong> {item.serialNumber}</p> 

                

                {/* Display checklist if applicable */}
                {item.service &&
                    item.serviceType &&
                    services[item.service].types[item.serviceType]?.checklist.length > 0 && (
                    <ul className="checklist">
                    <h4>Checked documents:</h4>
                    {services[item.service].types[item.serviceType].checklist.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                )}

                <button onClick={() => setExpandedClientId(null)}>Close</button>
              </div>
              
            </td>
          </tr>
        )}
        

      </React.Fragment>
    ))}
  </tbody>
</table>


      {/* View Selected Client details */}
     

    </div>
  );
}

export default DocumentForm;