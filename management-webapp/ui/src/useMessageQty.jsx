import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function useMessageQty({ user_id, user_uuid }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (user_id !== 0 && user_uuid) {
      window.console.info('useMessageQty');
    }
    (async () => {
      const response = await window.fetch('/api/enterprise/certificate/qty');
      const res = await response.json();
      setQty((prev) => prev + res.content.qty);
    })();
  }, []);

  return qty;
}

useMessageQty.propTypes = {
  user_id: PropTypes.number.isRequired,
  user_uuid: PropTypes.string.isRequred,
};
