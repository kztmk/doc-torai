import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { send } from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Layout from '@theme/Layout';
import * as React from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function ContactForm() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const history = useHistory();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });

  const [formErrors, setFormErrors] = React.useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      title: formData.title.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === '',
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending data to server with timeout
    try {
      // In a real app, you would send the form data to your API
      const serviceId = customFields.emailjsServiceId;
      const publicKey = customFields.emailjsPublicKey;
      const templateId = customFields.emailjsTemplateId;

      console.log('serviceId', serviceId);
      console.log('publicKey', publicKey);
      console.log('templateId', templateId);

      await send(serviceId, templateId, formData, publicKey);
      setShowSuccess(true);
      history.push('./thank-you'); // Redirect to thank you page
      navigate;
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Contact" description="Contact us">
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            問合せ
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ご不明な点、ご質問がございましたら、お気軽にお問い合わせください。
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={formErrors.firstName}>
                  <InputLabel htmlFor="firstName" required>
                    お名前
                  </InputLabel>
                  <OutlinedInput
                    id="name"
                    name="name"
                    label="お名前"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    aria-describedby="firstName-error"
                  />
                  {formErrors.firstName && (
                    <FormHelperText id="firstName-error">お名前を入力してください。</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth error={formErrors.email}>
                  <InputLabel htmlFor="email" required>
                    メールアドレス
                  </InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    label="メールアドレス"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-describedby="email-error"
                  />
                  {formErrors.email && (
                    <FormHelperText id="email-error">有効なメールアドレスを入力してください。</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="件名"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth error={formErrors.message}>
                  <TextField
                    id="message"
                    name="message"
                    label="問合せ内容"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    error={formErrors.message}
                    helperText={formErrors.message ? '問合せ内容をお書きください。' : ''}
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                  endIcon={<SendIcon />}
                  sx={{ py: 1.5 }}
                >
                  {isSubmitting ? '送信中...' : '送信'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
            問合せをいただき、ありがとうございます。
          </Alert>
        </Snackbar>

        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowError(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
            メール送信中にエラーが発生しました。ページをリロード後に再度お試しください。
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}
