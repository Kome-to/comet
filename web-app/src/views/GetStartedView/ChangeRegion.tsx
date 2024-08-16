import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

interface ChangeRegionProps {
  className?: string;
}

const languages = [
  { text: 'common.text.english', code: 'en' },
  { text: 'common.text.vietnamese', code: 'vi' },
];

const LanguageDialog: React.FC<{
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}> = ({ open, selectedValue, onClose }) => {
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <div className='flex items-center gap-2'>
          <LanguageIcon />
          {t('getStartedView.text.title.chooseLanguage')}
        </div>
      </DialogTitle>
      <List className="!border-gray-500/[.50]" sx={{ pt: 0, width: '300px', borderStyle: 'solid', borderTop: 1 }}>
        {languages.map(({ code, text }) => (
          <ListItem disablePadding disableGutters key={code}>
            <ListItemButton onClick={() => onChangeLanguage(code)}>
              <ListItemText primary={t(text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const ChangeRegion: React.FC<ChangeRegionProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string>('');
  const classes = classNames(className);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <>
      <div onClick={handleClickOpen} className={classes}>
        {t('common.text.changeRegion')}
      </div>
      <LanguageDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

export default ChangeRegion;
