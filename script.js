/**
 * suivre l'etat du colis
 * @param {fr.laposte.SuivreEtat} tx - le colis à suivre
 * @transaction
 */
function SuivreEtatColis(tx) {
    tx.colis.etat = tx.newstate;
    return getAssetRegistry('fr.laposte.Colis')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.colis);
        });
}
/**
 * distribuer le colis
 * @param {fr.laposte.Deplacement} tx - le colis à transporter
 * @transaction
 */
function DeplacementColis(tx) {
   
    }
/**
 * distribuer le colis
 * @param {fr.laposte.Distribution} tx - le colis à distribuer
 * @transaction
 */
function DistribueColis(tx) {
    tx.colis.Localisation=tx.Destinataire.adr
    
    let depart=tx.Depart
    let livreur=tx.facteur
    return getAssetRegistry('fr.laposte.Colis')
        .then(function (assetRegistry) {
            return assetRegistry.update(tx.colis);
        }).then(function(){
    
        var event = getFactory().newEvent('fr.laposte', 'DistribueEvent');
        event.colis= tx.colis;
        event.Depart = depart;
        event.facteur=livreur;
        event.Destinataire = tx.Destinataire;
        event.Message=tx.Message;
        emit(event);})
}
/** 
* deplacer le colis entre centres de tris
* @param {fr.laposte.Transport} tx - le colis à transporter
* @transaction
*/
function transportColis(tx) {
   tx.colis.Localisation=tx.Arrive.adr
  
   let depart=tx.Depart
   let arrive=tx.Arrive
   
   return getAssetRegistry('fr.laposte.Colis')
       .then(function (assetRegistry) {
           return assetRegistry.update(tx.colis);
       }).then(function(){
   
       var event = getFactory().newEvent('fr.laposte', 'TransportEvent');
       event.colis= tx.colis
       event.Depart = depart;
       event.Destinataire = arrive;
       event.Message=tx.Message;
       emit(event);})
}