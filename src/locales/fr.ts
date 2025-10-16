export default {
  app: {
    title: 'Messages Leboncoin',
  },
  conversations: {
    noConversations: 'Aucune conversation',
    loadError: 'Échec du chargement des conversations',
    newConversation: 'Nouvelle conversation',
    selectUser: 'Sélectionner un utilisateur',
    cancel: 'Annuler',
    start: 'Démarrer',
  },
  messages: {
    noMessages: 'Aucun message',
    loadError: 'Échec du chargement des messages',
    inputPlaceholder: 'Écrivez un message...',
    send: 'Envoyer',
    you: 'Vous',
    other: 'Autre',
  },
  error: {
    title: "Ce n'est pas vous, c'est moi",
    description: "Une erreur s'est produite de notre côté. Nous travaillons à la résoudre.",
    tryAgain: 'Réessayer',
    errorId: "ID d'erreur",
  },
  common: {
    retry: 'Réessayer',
  },
  notFound: {
    title: 'Page introuvable',
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: 'Retour aux conversations',
  },
} as const
