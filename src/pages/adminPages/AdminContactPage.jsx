import { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Badge, ModalHeader, ModalBody, ModalFooter, Card, Avatar } from 'flowbite-react';
import { Mail, Calendar, X, Eye, Globe, MessageSquare } from 'lucide-react';
import axios from 'axios';

function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contact');
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-error mb-4">{error}</p>
          <Button onClick={fetchContacts}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Contact Attempts</h1>
        <p className="text-gray-600 dark:text-gray-400">{contacts.length} total contact submissions</p>
      </div>

      {/* Compact Contact Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {contacts.map((contact) => (
          <Card
            key={contact._id}
            className="cursor-pointer rounded-2xl border ring-1 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            onClick={() => openContactModal(contact)}
          >
            <div className="flex items-start justify-between space-x-2">
              {/* Avatar and Basic Info */}
              <div className="flex min-w-0 flex-1 items-center space-x-2">
                <Avatar
                  placeholderInitials={getInitials(contact.firstName, contact.lastName)}
                  rounded
                  size="sm"
                  color="purple"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">{formatDate(contact.createdAt)}</p>
                </div>
              </div>

              {/* View Badge */}
              <Badge color="gray" size="sm">
                <Eye className="h-3 w-3" />
              </Badge>
            </div>

            {/* Compact Info */}
            <div className="space-y-1">
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Mail className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="truncate">{contact.subject}</span>
              </div>

              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Globe className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="truncate font-mono">{contact.ip}</span>
              </div>
            </div>

            {/* Note Preview */}
            <div className="mt-1">
              <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{contact.note}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* No contacts state */}
      {contacts.length === 0 && (
        <div className="py-12 text-center">
          <Mail className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">No contact attempts yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Contact form submissions will appear here.</p>
        </div>
      )}

      {/* Contact Detail Modal */}
      <Modal show={isModalOpen} onClose={closeModal} size="lg">
        <ModalHeader>
          <div className="flex items-center space-x-3">
            <Avatar
              placeholderInitials={
                selectedContact ? getInitials(selectedContact.firstName, selectedContact.lastName) : ''
              }
              rounded
              size="md"
              color="purple"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {selectedContact?.firstName} {selectedContact?.lastName}
              </h3>
              <p className="text-sm text-gray-500">{selectedContact?.email}</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Subject</label>
              <p className="font-medium text-gray-900 dark:text-white">{selectedContact?.subject}</p>
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                <MessageSquare className="mr-1 h-4 w-4" />
                Message
              </label>
              <div className="mt-1 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <p className="whitespace-pre-wrap text-gray-900 dark:text-white">{selectedContact?.note}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 h-4 w-4" />
                  Submitted
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {selectedContact ? formatDate(selectedContact.createdAt) : ''}
                </p>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  <Globe className="mr-1 h-4 w-4" />
                  IP Address
                </label>
                <p className="font-mono text-sm text-gray-900 dark:text-white">{selectedContact?.ip}</p>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="gray" onClick={closeModal}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button color="blue" onClick={() => window.open(`mailto:${selectedContact?.email}`, '_blank')}>
            <Mail className="mr-2 h-4 w-4" />
            Reply via Email
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminContactPage;
