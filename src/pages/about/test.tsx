
import { useState, useEffect } from "react"
import Select from 'react-select';


//Used for formatting db response to work with react-select component
export const formatResponse = (respData: any) => {
return respData.map(({ id, name, level }: any) => {
  if (level === undefined) {
    return { label: name, value: id }
  } else {
    return { label:level, value: id }
  }
})
}
export const labelToValue = (respData: any) => {
return respData.map(({ name, level, code }: any) => {
  if (level === undefined && code === undefined) {
    return { label: name, value: name }
  } else if(level !== undefined) {
    return { label:level, value:level }
  } else {
    return { label:code, value: code }
  }
})
}


export const labelToEmail = (respData: any) => {
return respData.map(({ email ,id }: any) => {
  return { label: email, value: email }
})
}


const EditInvoiceOrg = () => {
    const [invoice, setInvoice] = useState<any>({
      id: 842,
      name: 'testing iorg',
      country: 'sweden',
      language: 'Estonian',
      invoice_email: 'test@email.com',
      vat_status: 1,
      currency: 'SEK',
      active_status: 1
    });

    const [countries, setCountries] = useState<any[]>(formatResponse([{name:'test country', country: 'testin'},{name: "Denmark",
    country: "inactive",}]));
    const [companies, setCompanies] = useState<any[]>(formatResponse([ {
      id: 888,
      name: "Adaras",
      status: "inactive",
     
    }, {
      id: 889,
      name: "Adaras-2",
      status: "inactive",
     
    }]));
    const [currencies, setCurrencies] = useState<any[]>(labelToValue([{
      id: 1,
      code: "SEK",
      
    },{
      id: 2,
      code: "EURO",
      
    }]));
    const [terms, setTerms] = useState<any[]>(formatResponse([{
      id: 1,
      name: "30 days",
      
    },{
      id: 2,
      name: "40 days",
      
    }]));
    const [vats, setVats] = useState<any[]>(labelToValue([{
      id: 1,
      level: "30",
      
    },{
      level: 2,
      name: "25",
      
    }]));
    const [vatsStatuses, setVatsStatuses] = useState<any[]>([{ label: 'YES', value: 1 }, { label: 'NO', value: 0 }]);
    const [languages, setLanguages] = useState<any[]>(formatResponse([{
      id: 1,
      name: "Swedish",
      
    },{
      id: 2,
      name: "Estonian",
      
    }]));
    const [mailoptions, setMailoptions] = useState<any[]>(formatResponse([{
      id: 1,
      name: "Invoice via mail without attachment",
      
    },{
      id: 2,
      name: "Invoice via mail  attachment",
      
    }]));
    const [activeStatus, setActiveStatus] = useState<any[]>([{ label: 'YES', value: 1 }, { label: 'NO', value: 0 }]);
    const [selectetedCountries, setSelectetedCountries] = useState<any[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
    const [selectedRecipients, setSelectedRecipients] = useState<any[]>([]);
    const [selectedMails, setSelectedMails] = useState<any[]>([]);
    const [selectetedTerms, setSelectetedTerms] = useState<any[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
    const [selectedVats, setSelectedVats] = useState<any[]>([]);
    const [selectedVatStatus, setSelectedVatsStatus] = useState<any[]>([]);
    const [selectedCurrencies, setSelectedCurrencies] = useState<any[]>([]);
    const [selectedActStatus, setSelectedActStatus] = useState<any[]>([]);
    const [invoiceEmails, setInvoiceEmails] = useState<any[]>([]);
   

    useEffect(() => {

        try {
            const invCountryProp = 
            setSelectetedCountries(formatResponse([
              {
                id: 4,
                name: "Denmark",
                "code": "dk",
                "language": "da"
                
              }
            ]))
            const invoiceCompaniesProp = 
            setSelectedCompanies(formatResponse([
              {
                id: 888,
                name: "Adaras",
                "status": "inactive",
               
              }
            ]))
            const mailsProp = 
            setSelectedMails(formatResponse([
              {
                id: 1,
                name: "Invoice via mail without attachment",
                
              }
            ]))
            const recipientsProp = 
            setSelectedRecipients(labelToEmail( [
              {
                id: 558,
                email: "www@ww.com",
                
                
              },{
                  id: 563,
                  email: "www@ww.seeen",
                
                }
                
              ]))
        } catch (error) {
            console.log('errrorr', error);

        }
    }, [])


    useEffect(() => {
        const getInvoiceProps = (array: any[], label: string) => {
            return array.find((arr: any) => (arr.label === label))
        }
        const getInvoiceStatus = (array: any[], label: string) => {
          return array.find((arr: any) => (arr.value === label))
      }

        try {
            setSelectedCurrencies(getInvoiceProps(currencies, invoice.currency))
            setSelectetedTerms(getInvoiceProps(terms, invoice.terms_of_payment))
            setSelectedLanguages(getInvoiceProps(languages, invoice.language))
            setSelectedVats(getInvoiceProps(vats, invoice.vat_level))
            setSelectedVatsStatus(getInvoiceStatus(vatsStatuses, invoice.vat_status))
            setSelectedActStatus(getInvoiceStatus(activeStatus, invoice.active_status))

        } catch (error) {
            console.log('ERROR ', error);

        }
    }, [currencies, terms, languages, mailoptions, vats, vatsStatuses, activeStatus, invoice])

    // all inputs feilds except invoice_email edit
    const handleChange = async (event: any) => {
        const { name, value } = event.target;
        if (name !== 'invoice_email[]') {
          setInvoice({ ...invoice, [name]: value });
        }else{
          const { id, value } = event.target;
          const newRecipients = selectedRecipients.map((recipient, index) =>
            index === parseInt(id) ? { ...recipient, label: value, value: value } : recipient
          );
          setSelectedRecipients(newRecipients);
        }
    }

    // const handleChangeInvoiceEmail = (event:any) => {
    //   const {id,value} = event.target
    //   const newRecipients = [...selectedRecipients];
    //   newRecipients[parseInt(id)].label = value;
    //   newRecipients[parseInt(id)].value = value;
    //   setSelectedRecipients(newRecipients);
    // };

    const handleChangeInvoiceEmail = (event:any) => {
      const { id, value } = event.target;
      const newRecipients = selectedRecipients.map((recipient, index) =>
        index === parseInt(id) ? { ...recipient, label: value, value: value } : recipient
      );
      setSelectedRecipients(newRecipients);
    };
    

    // remove input feild that newly added 
    const handleAddInput = () => {
        setInvoiceEmails((arr: any) => [...arr, { id: invoiceEmails.length + 1, value: 'email' }])

    }

    // remove input feild that is includes in invoiceorg 
    const handleRemoveInput = (option: string | number, fields: string) => {
        if (fields === 'id') {
            setInvoiceEmails((arr: any) => arr.filter((email: any) => email.id !== option))
        } else {
            setSelectedRecipients((arr: any) => arr.filter((email: any) => email.value !== option))
        }
    }


    return (
        <>
            <div className="w-full">
                <div className="card">
                    <div className="card-body">
                        <form method="POST" action="http://localhost:8080/" >
                           <input type="text" name="country" value={invoice.country} onChange={handleChange}/>
                            <div className="form-group">
                                <label className="form-label">Country</label>
                                <Select
                                    name="countries[]"
                                    options={countries}
                                    classNamePrefix="select"
                                    placeholder="Choose Country"
                                    value={selectetedCountries}
                                    onChange={(e) => setSelectetedCountries(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Languages</label>
                                <Select
                                    name="language"
                                    options={languages}
                                    classNamePrefix="select"
                                    placeholder="Languages"
                                    value={selectedLanguages}
                                    onChange={(e) => setSelectedLanguages(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Currencies</label>
                                <Select
                                    name="currency"
                                    options={currencies}
                                    classNamePrefix="select"
                                    placeholder="Choose Currency"
                                    value={selectedCurrencies}
                                    onChange={(e) => setSelectedCurrencies(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">VAT Status</label>
                                <Select
                                    name="vat_status"
                                    options={vatsStatuses}
                                    classNamePrefix="select"
                                    placeholder="Does this organisation use VAT?"
                                    value={selectedVatStatus}
                                    onChange={(e) => setSelectedVatsStatus(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">VAT's Level</label>
                                <Select
                                    name="vat_level"
                                    options={vats}
                                    classNamePrefix="select"
                                    placeholder="Choose VAT level"
                                    value={selectedVats}
                                    onChange={(e) => setSelectedVats(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>


                            <div className="form-group">
                                <label className="form-label">Invoice Options</label>
                                <Select
                                    name="mailoptions[]"
                                    options={mailoptions}
                                    classNamePrefix="select"
                                    placeholder="Choose Invoice Options"
                                    value={selectedMails}
                                    onChange={(e) => setSelectedMails(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Active</label>
                                <Select
                                    name="active_status"
                                    options={activeStatus}
                                    classNamePrefix="select"
                                    placeholder="Is this organisation active?"
                                    value={selectedActStatus}
                                    onChange={(e) => setSelectedActStatus(e)}
                                    required
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderColor:'#d2ddec',
                                        }),
                                      }}
                                />
                            </div>
                            
                           
                            {/* Invoice emails which is already attached to invoiceorg */}
                            {
                                selectedRecipients.map((recipient: any, index: number) => {
                                    return <div className="form-group" key={index}>
                                        <label className="form-label">Invoice Email</label>
                                        <div className="row float-left" style={{ marginLeft: '-12px' }}>
                                            <div style={{ width: '80%' }}>
                                                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id={`${index}`} name="invoice_email[]" placeholder="email@domain.com" value={recipient.label || ''}
                                                    required onChange={handleChange} />
                                            </div>
                                            {
                                                selectedRecipients.length > 0 && <button className="btn btn-primary col-md-2 delete" style={{ maxHeight: '42px' }} onClick={() => handleRemoveInput(recipient.value, 'value')}>Remove</button>
                                            }
                                        </div>
                                    </div>


                                })
                            }
                            {/* Invoice emails/email which will be attached to invoiceorg */}
                            {
                                invoiceEmails.map((recipient: any, index: number) => {
                                    return <div className="form-group" key={index}>
                                        <label className="form-label">Invoice Email</label>
                                        <div className="row float-left" style={{ marginLeft: '-12px' }}>
                                            <div style={{ width: '80%' }}>
                                              {/* 100 is added with index as value of id for avoiding conflict with ids above */}
                                                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight " id={`${index + 10}`} name="invoice_email[]" placeholder="email@domain.com" required onChange={handleChange} />
                                            </div>
                                            {
                                                <button className="bg-red-500" style={{ maxHeight: '42px' }} onClick={() => handleRemoveInput(recipient.id, 'id')}>Remove</button>
                                            }
                                        </div>
                                    </div>


                                })
                            }

                            <div className="col-md-12" style={{ marginBottom: '15px', minHeight: '50px' }}>
                                <button className="bg-lightGreen hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" role="button" onClick={handleAddInput}>Add New In' Email &nbsp;
                                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
                                </button>
                            </div>

                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </>

    )
}

export default EditInvoiceOrg