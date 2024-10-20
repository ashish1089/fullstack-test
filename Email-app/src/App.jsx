import React, { useEffect, useReducer, useState } from 'react'
import EmailList from './components/EmailList'
import EmailBody from './components/EmailBody';
import './App.css'
import Filter from './components/Filter';


export default function App() {
  const [emails, setEmails] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  );
  const [readEmails, setReadEmails] = useState(() => {
    const savedRead = localStorage.getItem('readEmails');
    return savedRead ? new Set(JSON.parse(savedRead)) : new Set();
  }
  );
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeEmail, setActiveEmail] = useState([]);
  const [showEmailBody, setShowEmailBody] = useState(false);
  const [activeButton, setActiveButton] = useState('all');

  useEffect(() => {
    getEmailList();
    setFilterStatus('all')
  }, [])

  async function getEmailList() {
    const response = await fetch('https://flipkart-email-mock.now.sh/');
    const data = await response.json();
    if (data) {
      const emailsWithStatus = data.list.map((email) => ({
        ...email,
        read: false,
        date: new Date(email.date).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      }))
      setEmails(emailsWithStatus)
    }
  }

  const getEmailbody = async (email) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${email.id}`);
    const data = await response.json();
    if (data) {
      setActiveEmail({
        id: data.id,
        body: data.body,
        date: email.date,
        subject: email.subject,
        name: email.from.name,
      });
    }
  }
  const handleEmailClick = (clickedEmail) => {

    setEmails(prevEmails => {
      const updateReadStatus = prevEmails.map(email => email.id === clickedEmail.id
        ? { ...email, read: true }
        : email)
      return updateReadStatus;
    })

    setReadEmails((prev) => {
      const updated = new Set(prev);
      updated.add(clickedEmail.id);
      localStorage.setItem('readEmails', JSON.stringify([...updated]));
      return updated;
    })
    getEmailbody(clickedEmail)

    if (clickedEmail.id === activeEmail.id) {
      setShowEmailBody(!showEmailBody)
    } else setShowEmailBody(true)

  }

  const toggleFavorite = emailId => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(emailId)
        ? prevFavorites.filter(favId => favId !== emailId)
        : [...prevFavorites, emailId];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    )
  }

  const filteredEmails = () => {
    switch (filterStatus) {
      case 'read':
        return emails.filter(email => readEmails.has(email.id));
      case 'unread':
        return emails.filter(email => !readEmails.has(email.id));
      case 'favorites':
        return emails.filter(email => favorites.includes(email.id));
      default:
        return emails;
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status)
    setActiveButton(status)
    setShowEmailBody(false);
  }

  return (
    <>
      <div className='container px-12'>
        <Filter handleFilter={handleFilter} activeButton={activeButton} />
        <main className='flex gap-6 justify-between '>
          {/* email list on left */}
          <div className='flex-1'>
            <EmailList
              emails={filteredEmails()}
              onEmailClick={handleEmailClick}
              favorites={favorites}
              showEmailBody={showEmailBody}
              readEmails={[...readEmails]}
            />
          </div>

          {/* email body on right */}
          <div className={`emailBody ${showEmailBody ? '' : 'hidden'}`}>
            {activeEmail.id && <EmailBody email={activeEmail} toggleFavorite={toggleFavorite} favorites={favorites} />}
          </div>
        </main>
      </div >
    </>
  )
}
