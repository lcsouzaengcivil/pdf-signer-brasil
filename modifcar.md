ALTERAR BIBLIOTECA DE ASSINATURA

pdf-signer-brazil/dist/signature/digital-signature.service

Linha 58 function getCertificate

// Retorna um certificado de assinatura válido
const getCertificate = (p7, certBags, privateKey) => {
    let certificate;
    let validCertificate;

    Object.keys(certBags).forEach((key) => {
        const certBag = certBags[key];
        const publicKey = certBag?.cert?.publicKey;
        const rawCertificate = certBag.cert;

    // Adiciona o certificado ao p7
        p7.addCertificate(rawCertificate);

    // Verifica e valida o certificado
        validCertificate = getValidatedCertificate(privateKey, publicKey, rawCertificate);

    if (validCertificate) {
            certificate = validCertificate;
        }
    });

    // Verifica se encontrou um certificado válido correspondente à chave privada
    if (!certificate) {
        throw new Error('Failed to find a certificate that matches the private key.');
    }

    return certificate;
}


//Modificar  npm da lib pdf-lib

node_modules\pdf-lib\cjs\api\PDFDocument.js

Modificar Linha: 60
/*
  if (updateMetadata)
    this.updateInfoDict();
*/
