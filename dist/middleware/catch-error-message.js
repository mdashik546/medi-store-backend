export const catchErrorMessage = (res, error) => {
    res.status(500).json({
        success: false,
        message: error,
    });
};
